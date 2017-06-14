class MessageThreadsUser < ApplicationRecord
  belongs_to :user
  belongs_to :message_thread
end
