module ApplicationHelper
  def redux_initial_state
    {
      currentUser: {
        id: current_user.id,
        username: current_user.username,
        avatarUrl: current_user.avatar_url
      }
    }
  end
end
