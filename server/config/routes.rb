Rails.application.routes.draw do
  post '/api/register' => 'users#register'
  post '/api/login' => 'users#login'
  post '/api/index' => 'homepage#index'
  post '/api/delete' => 'homepage#delete'
  post '/api/add' => 'homepage#add'
  post '/api/like' => 'homepage#like'
end
