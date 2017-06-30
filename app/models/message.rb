class Message < ApplicationRecord
  validates :body, presence: true

  belongs_to :message_thread, touch: true
  belongs_to :user

  scope :recent, -> { order(created_at: :desc) }
end
