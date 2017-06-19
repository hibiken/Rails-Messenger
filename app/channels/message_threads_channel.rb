class MessageThreadsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "message_threads_#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
