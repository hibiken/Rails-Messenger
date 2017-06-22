class MessagesController < ApiController
  before_action :set_message_thread, only: [:create]

  def create
    message = current_user.messages.build(message_params)
    message.message_thread_id = @message_thread.id

    if message.save
      MessageThreads::Broadcast.new(@message_thread, message, params[:message][:temp_id]).call
      head :ok
    else
      head :unprocessable_entity
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
