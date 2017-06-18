class MessageThreadSerializer < ActiveModel::Serializer
  attributes :id, :u_ids, :receiver_ids

  has_many :messages
  has_many :users, serializer: UserSerializer

  def receiver_ids
    object.u_ids.select { |id| id != scope.id }
  end
end
