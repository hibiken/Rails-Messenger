class UsersController < ApplicationController
  before_action :authenticate_user_from_token!, only: [:index]

  def index
    users = User.all
    render json: users, each_serializer: UserSerializer, status: :ok
  end
end
