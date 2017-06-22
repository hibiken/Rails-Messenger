class Message < ApplicationRecord
  validates :body, presence: true

  belongs_to :message_thread
  belongs_to :user
end
