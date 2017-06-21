class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :user_id, :persisted

  belongs_to :message_thread
  belongs_to :user

  def persisted
    object.persisted?
  end
end
