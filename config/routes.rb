Rails.application.routes.draw do
  root 'pages#home'
  devise_for :users, controllers: { registrations: 'users/registrations' }
  get '/about', to: 'pages#about'
  resources :contacts, only: :create # Don't need to add 'new' since we made custom URL for it below [:new, :create]
  get "contact-us", to: "contacts#new", as: "new_contact"
end
