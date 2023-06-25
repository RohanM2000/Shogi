class Api::UsersController < ApplicationController

  
  wrap_parameters include: User.attribute_names + ['password']

  def create

    # render json: user_params

    @user = User.new(user_params)

    if @user.save
      login!(@user)
      # render json: { user: @user}
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end

  end

  def show
    @user = User.find_by(id: params[:id])

    if @user
      render :showNoEmail
    else
      render json: { errors: ["No user with given id"]}, status: 422
    end 
  end

  def index
    @users = []

    if params[:search_query]
      @users = User.where("username LIKE ?", "%#{params[:search_query]}%")
    else
      @users = User.all
    end

    render :index
  end

  def update
    @user = current_user

    if @user.update(user_params)
      render :showNoEmail
    else
      render json: { errors: ["Could not save picture to current profile"]}, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :photo)
  end
end
