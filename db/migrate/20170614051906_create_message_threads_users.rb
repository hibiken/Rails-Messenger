class CreateMessageThreadsUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :message_threads_users do |t|
      t.references :user, foreign_key: true
      t.references :message_thread, foreign_key: true

      t.timestamps
    end
  end
end
