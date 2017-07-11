class UsersController < ApiController
  def index
    users = User.where.not(id: current_user.id)
    render json: users, each_serializer: UserSerializer, status: :ok
  end

  def search
    # TODO: replace with search
    users = User.all
    render json: users, each_serializer: UserSerializer, status: :ok
  end
end
