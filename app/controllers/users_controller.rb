class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @favorites = @user.trips
  end
end
