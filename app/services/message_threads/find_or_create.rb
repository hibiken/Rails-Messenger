module MessageThreads
  class FindOrCreate
    def self.call(user_ids)
      Find.call(user_ids) || Create.call(user_ids)
    end
  end
end
