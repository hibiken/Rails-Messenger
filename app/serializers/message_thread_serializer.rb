class MessageThreadSerializer < ActiveModel::Serializer
  attributes :id, :u_ids, :receivers_ids

  has_many :messages
  has_many :users, serializer: UserSerializer

  def receivers_ids
    object.u_ids.select { |id| id != scope.id }
  end
end
