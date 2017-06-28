class AddLastSeenMessageIdToMessageThreadsUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :message_threads_users, :last_seen_message_id, :integer
    add_column :message_threads_users, :last_seen_at, :datetime
  end
end
