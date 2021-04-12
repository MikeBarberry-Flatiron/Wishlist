require 'jwt'

class UsersController < ApplicationController
    def register 
        user = User.create(username: params[:username], password: params[:password])
        if user.save 
            render json: {:status => 201, :message => "User registered"}
        else 
            render json: {:status => 400, :errors => user.errors.full_messages}
        end 
    end 

    def login
        user = User.find_by(:username => params[:username])
        if user && user.authenticate(params[:password])
            payload = { user_name: user.username }
            hmac_secret = '$ecr#tK@Y&'
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {:status => 200, :message => "Logged In", :jwt => token } 
        else 
            render json: {:status => 401, :message => "Authentication Failed"}
        end 
    end 
end
