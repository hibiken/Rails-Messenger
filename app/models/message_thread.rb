class MessageThread < ApplicationRecord
  has_many :message_threads_users, dependent: :destroy
  has_many :users, through: :message_threads_users
  has_many :messages, dependent: :destroy

  def last_message
    messages.recent.first
  end

  def seen_by(user)
    return unless last_message.present?
    join_record = message_threads_users.find_by!(user: user)
    join_record.update(
      last_seen_message_id: last_message.id,
      last_seen_at: Time.zone.now)
  end
end
