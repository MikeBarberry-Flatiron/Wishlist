Rails.application.routes.draw do
  post '/register' => 'users#register'
  post '/login' => 'users#login'
  post '/index' => 'homepage#index'
  get  '/recent' => 'homepage#recent'
  post '/delete' => 'homepage#delete'
  post '/add' => 'homepage#add'
end
