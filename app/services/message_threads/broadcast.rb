module MessageThreads
  class Broadcast
    def initialize(message_thread, message, temp_id)
      @message_thread = message_thread
      @message = message
      @temp_id = temp_id
    end

    def call
      message_thread.u_ids.each do |user_id|
        broadcast_to(user_id)
      end
    end

    private

    attr_reader :message_thread, :message, :temp_id

    def broadcast_to(user_id)
      ActionCable.server.broadcast(
        "message_threads_#{user_id}",
        message_json
      )
    end

    def serializable_message
      ActiveModelSerializers::SerializableResource.new(message)
    end

    def message_json
      serializable_message.as_json.merge(
        tempId: temp_id,
        type: 'message_created',
        messageThreadUpdatedAt: message_thread.reload.updated_at
      )
    end
  end
end
