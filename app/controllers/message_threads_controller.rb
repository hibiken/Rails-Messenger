class MessageThreadsController < ApiController
  def index
    message_threads = current_user.message_threads
                        .includes(:users, :message_threads_users, messages: [:user])
    render json: message_threads, include: ['users', 'messages'], status: :ok
  end

  def create
    if message_thread = MessageThreads::FindOrCreate.call(user_ids)
      render json: message_thread, status: :ok
    else
      # TODO: Render error json
    end
  end

  def seen
    message_thread = current_user.message_threads.find(params[:id])
    message_thread.seen_by(current_user)
    message_thread.u_ids.each do |user_id|
      ActionCable.server.broadcast(
        "message_threads_#{user_id}",
        type: 'message_thread_seen',
        messageThreadId: message_thread.id,
        lastSeenMessageIdsByUserId: last_seen_message_ids_by_user_id(message_thread),
      )
    end
  end

  private

  def message_thread_params
    params.require(:message_thread).permit(user_ids: [])
  end

  def user_ids
    message_thread_params[:user_ids] << current_user.id.to_s
  end

  def last_seen_message_ids_by_user_id(message_thread)
    message_thread.message_threads_users.reduce(Array.new) do |acc, record|
      acc.push({
        userId: record.user_id,
        lastSeenMessageId: record.last_seen_message_id,
        lastSeenAt: record.last_seen_at,
      })
    end
  end
end
