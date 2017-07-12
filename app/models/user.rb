class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:facebook]

  has_many :message_threads_users, dependent: :destroy
  has_many :message_threads, through: :message_threads_users
  has_many :messages, dependent: :destroy

  def self.find_or_create_from_facebook(auth)
    user = where(provider: auth.provider, uid: auth.uid).first_or_create
    user.update(
      email: auth.info.email,
      password: Devise.friendly_token[0,20],
      username: auth.info.name,
      avatar_url: auth.info.image)

    user
  end

  include PgSearch
  pg_search_scope :search_by_username, against: [:username],
    using: { tsearch: { prefix: true } }
end
