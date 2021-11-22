Rails.application.routes.draw do
  
  resources :users, only:[:show, :create, :index, :destroy]
  resources :prescriptions
  resources :medications, only: [:index,:show]
  resources :doctors, only: [:index, :show, :create, :destroy]
  post "/log_in", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
