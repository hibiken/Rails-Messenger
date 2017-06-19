class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :user_id

  belongs_to :message_thread
  belongs_to :user
end
