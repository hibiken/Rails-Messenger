class AddUserIdsToMessageThreads < ActiveRecord::Migration[5.1]
  def change
    add_column :message_threads, :u_ids, :integer, array: true
    add_index :message_threads, :u_ids, using: 'gin'
  end
end
