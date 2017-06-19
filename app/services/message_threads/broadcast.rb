module MessageThreads
  class Broadcast
    def initialize(message_thread, message)
      @message_thread = message_thread
      @message = message
    end

    def call
      message_thread.u_ids.each do |user_id|
        broadcast_to(user_id)
      end
    end

    private

    attr_reader :message_thread, :message

    def broadcast_to(user_id)
      ActionCable.server.broadcast(
        "message_threads_#{user_id}",
        message_thread_id: message_thread.id,
        message: {
          id: message.id.to_s,
          body: message.body,
          createdAt: message.created_at,
          userId: message.user_id.to_s
        }
      )
    end
  end
end
