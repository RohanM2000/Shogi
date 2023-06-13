class Api::SessionsController < ApplicationController
  def show
    # banana
    if logged_in?
      @user = current_user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])
    if @user
      login!(@user)
      # render json: { user: @user }
      render 'api/users/show'
    else
      render json: { errors: ["The provided credentials were invalid."] }, status: :unauthorized
    end
  end

  def destroy
    if logged_in?
      logout!
    end
    render json: { message: "success" }
  end
end
