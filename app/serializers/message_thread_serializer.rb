class MessageThreadSerializer < ActiveModel::Serializer
  attributes :id, :u_ids, :receiver_ids, :last_seen_message_ids_by_user_id,
    :last_message, :updated_at

  has_many :messages
  has_many :users, serializer: UserSerializer

  def receiver_ids
    object.u_ids.select { |id| id != scope.id }
  end

  def last_seen_message_ids_by_user_id
    object.message_threads_users.reduce(Array.new) do |acc, record|
      acc.push({
        user_id: record.user_id,
        last_seen_message_id: record.last_seen_message_id,
        last_seen_at: record.last_seen_at
      })
    end
  end

  # FIXME: this is not converted to camelCase
  def last_message
    object.last_message
  end
end
