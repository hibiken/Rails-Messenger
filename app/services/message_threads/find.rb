module MessageThreads
  class Find
    def self.call(user_ids)
      sorted_ids = user_ids.sort
      MessageThread.find_by(u_ids: sorted_ids)
    end
  end
end
