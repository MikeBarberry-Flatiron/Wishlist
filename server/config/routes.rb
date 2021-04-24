Rails.application.routes.draw do
  post '/register' => 'users#register'
  post '/login' => 'users#login'
  post '/index' => 'homepage#index'
  post '/delete' => 'homepage#delete'
  post '/add' => 'homepage#add'
  post '/like' => 'homepage#like'
end
