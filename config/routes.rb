Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  root to: 'dashboard#index'
  resources :users, only: [:index]
  resources :message_threads, only: [:create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
