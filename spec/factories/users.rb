FactoryGirl.define do
  factory :user do
    username { FFaker::Internet.user_name }
    provider "facebook"
    uid { SecureRandom.hex }
    avatar_url { FFaker::Avatar.image }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }
  end
end
