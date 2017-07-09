Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :users, only: [:index]
  resources :message_threads, only: [:index, :create] do
    resources :messages, only: [:index, :create]
      post :seen, on: :member
    resource :user_typings, only: [] do
      post :stopped
      post :started
    end
  end

  # Delegate routing to react-router in the frontend.
  get '/t/:message_thread_id', to: 'dashboard#index'
  get '/new', to: 'dashboard#index'

  root to: 'dashboard#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
