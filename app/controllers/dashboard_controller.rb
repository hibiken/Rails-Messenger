class DashboardController < ApplicationController
  layout 'dashboard'

  before_action :authenticate_user!

  def index
    cookies.signed[:user_id] = current_user.id
    @auth_token = JsonWebToken.encode({ user_id: current_user.id })
  end
end
