class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :user_id
end
