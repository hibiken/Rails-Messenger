class MessagesController < ApiController
  before_action :set_message_thread, only: [:create]

  def create
    message = current_user.messages.build(message_params)
    message.message_thread_id = @message_thread.id

    if message.save
      # render json: message, status: :ok
      @message_thread.u_ids.each do |id|
        ActionCable.server.broadcast(
          "message_threads_#{id}",
          message_thread_id: @message_thread.id,
          message: {
            id: message.id.to_s,
            body: message.body,
            createdAt: message.created_at,
            userId: message.user_id.to_s
          }
        )
      end
      head :no_content
    else
      # Handle error case
    end
  end

  private

  def set_message_thread
    @message_thread = current_user.message_threads.find(params[:message_thread_id])
  end

  def message_params
    params.require(:message).permit(:body)
  end
end
