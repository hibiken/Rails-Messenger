class MessageThreadsController < ApiController
  def create
    if message_thread = MessageThreads::FindOrCreate.call(user_ids)
      render json: message_thread, status: :ok
    else
      # TODO: Render error json
    end
  end

  private

  def message_thread_params
    params.require(:message_thread).permit(user_ids: [])
  end

  def user_ids
    message_thread_params[:user_ids] << current_user.id.to_s
  end
end
