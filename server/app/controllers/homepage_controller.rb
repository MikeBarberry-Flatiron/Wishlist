require 'jwt'

class HomepageController < ApplicationController
    def index
        token = params[:jwt]
        hmac_secret = '$ecr#tK@Y&'
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256'}
        
        user_content = User.find_by(username: decoded_token[0]["user_name"])
        if user_content 
            render json: {:status => 200, :user_content => user_content.contents}
        else 
            render json: {:status => 400, :errors => user_content.errors.full_messages}
        end 
    end 

    def delete 
        content = Content.find(params[:content_id])
        content.delete
        render json: {:status => 200, :message => "Content Deleted"}
    end 

    def add 
        token = params[:jwt]
        hmac_secret = '$ecr#tK@Y&'
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256'}
        
        user = User.find_by(username: decoded_token[0]["user_name"])
        content = Content.create(description: params[:description], url: params[:url], image: params[:image], category: params[:category], user_id: user.id)
        if content.save 
            render json: {:status => 200, :message => "Content added"}
        else 
            render json: {:status => 400, :errors => content.errors.full_messages}
        end 
    end 
end
