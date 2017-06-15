module MessageThreads
  class Create
    def self.call(user_ids)
      ActiveRecord::Base.transaction do
        sorted_ids = user_ids.sort
        message_thread = MessageThread.create!(u_ids: sorted_ids)
        user_ids.each do |user_id|
          MessageThreadsUser.create!(user_id: user_id, message_thread_id: message_thread.id)
        end
        message_thread
      end
    rescue ActiveRecord::RecordInvalid => e
      false
    end
  end
end
