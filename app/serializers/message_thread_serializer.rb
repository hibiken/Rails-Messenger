class MessageThreadSerializer < ActiveModel::Serializer
  attributes :id, :u_ids

  has_many :messages

  has_many :messages
end
