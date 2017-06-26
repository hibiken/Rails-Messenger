class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :user_id, :persisted, :avatar_url, :username

  belongs_to :message_thread
  belongs_to :user

  def persisted
    object.persisted?
  end

  def avatar_url
    object.user.avatar_url
  end

  def username
    object.user.username
  end
end
