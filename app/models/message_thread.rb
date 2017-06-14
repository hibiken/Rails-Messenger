class MessageThread < ApplicationRecord
  has_many :message_threads_users, dependent: :destroy
  has_many :users, through: :message_threads_users
  has_many :messages, dependent: :destroy
end
