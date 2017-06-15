class MessageThreadsController < ApplicationController
  before_action :authenticate_user_from_token!

  def create
    user_ids = params[:user_ids] << current_user.id
    if message_thread = MessageThreads::FindOrCreate.call(user_ids)
      render json: message_thread, status: :ok
    else
      # TODO: Render error json
    end
  end
end
