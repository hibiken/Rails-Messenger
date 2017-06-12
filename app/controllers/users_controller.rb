class UsersController < ApplicationController
  # TODO: authenticate user with token
  def index
    users = User.all
    render json: users, each_serializer: UserSerializer, status: :ok
  end
end
