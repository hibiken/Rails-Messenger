class UserTypingsController < ApiController
  before_action :set_message_thread

  def started
    @message_thread.u_ids.each do |user_id|
      ActionCable.server.broadcast(
        "message_threads_#{user_id}",
        type: "user_typing_started",
        messageThreadId: @message_thread.id,
        userId: current_user.id
      ) unless user_id == current_user.id
    end
  end

  def stopped
    @message_thread.u_ids.each do |user_id|
      ActionCable.server.broadcast(
        "message_threads_#{user_id}",
        type: "user_typing_stopped",
        messageThreadId: @message_thread.id,
        userId: current_user.id
      ) unless user_id == current_user.id
    end
  end

  private

  def set_message_thread
    @message_thread = current_user.message_threads.find(params[:message_thread_id])
  end
end
