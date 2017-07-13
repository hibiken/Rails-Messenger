class UsersController < ApiController
  def index
    users = User.where.not(id: current_user.id)
    render json: users, each_serializer: UserSerializer, status: :ok
  end

  def search
    users = User.where.not(id: current_user.id).search_by_username(params[:q])
    render json: users, each_serializer: UserSerializer, status: :ok
  end
end
