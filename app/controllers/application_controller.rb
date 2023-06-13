class ApplicationController < ActionController::API
    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken, with: :invalid_authenticity_token
    include ActionController::RequestForgeryProtection
  
    protect_from_forgery with: :exception
    before_action :snake_case_params, :attach_authenticity_token
    # helper_method :logged_in?, :current_user, :require_logged_in


    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    def current_user
        return nil if !session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
    end

    def logged_in?
        !!current_user
    end
    def require_logged_in
        unless logged_in?
            render json: { message: 'Unauthorized'}, status: :unauthorized
        end
    end

    def test
        if params.has_key?(:login)
          login!(User.first)
        elsif params.has_key?(:logout)
          logout!
        end
      
        if current_user
          render json: { user: current_user.slice('id', 'username', 'session_token') }
        else
          render json: ['No current user']
        end
    end

    private

    def invalid_authenticity_token
        render json: { message: 'Invalid authenticity token' }, 
          status: :unprocessable_entity
    end
      
    def unhandled_error(error)
        if request.accepts.first.html?
          raise error
        else
          @message = "#{error.class} - #{error.message}"
          @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
          render 'api/errors/internal_server_error', status: :internal_server_error
          
          logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
        end
    end
end
