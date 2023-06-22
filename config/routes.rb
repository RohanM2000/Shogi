Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'

  namespace :api, defaults: {format: :json} do 
    resources :users, only: %i(create show index)
    resource :session, only: %i(show create destroy)
    resources :rooms, only: [:show, :create]
    resources :messages, only: [:create]
    resources :games, only: [:index, :show, :update]
    resources :queue_positions, only: [:create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
