module MessageThreads
  class FindOrCreate
    class << self
      def call(user_ids)
        user_ids = normalize_ids(user_ids)
        MessageThreads::Find.call(user_ids) || MessageThreads::Create.call(user_ids)
      end

      private

      def normalize_ids(ids)
        ids.map(&:to_i)
      end
    end
  end
end
