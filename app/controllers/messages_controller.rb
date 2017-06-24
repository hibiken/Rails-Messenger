class MessagesController < ApiController
  PER_PAGE = 30

  before_action :set_message_thread, only: [:index, :create]

  def index
    messages = @message_thread.messages
                 .includes(:user)
                 .recent
                 .paginate(page: page_number, per_page: PER_PAGE)
    render json: messages, status: :ok
  end

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

  def page_number
    params.dig(:page, :number)
  end
end
