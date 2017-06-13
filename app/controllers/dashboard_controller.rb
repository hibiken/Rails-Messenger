class DashboardController < ApplicationController
  layout 'dashboard'

  before_action :authenticate_user!

  def index
    @auth_token = JsonWebToken.encode({ user_id: current_user.id })
  end
end
