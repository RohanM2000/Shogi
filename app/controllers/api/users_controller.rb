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
    @users = User.all

    render :index
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
