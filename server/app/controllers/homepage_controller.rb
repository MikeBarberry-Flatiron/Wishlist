require 'jwt'

class HomepageController < ApplicationController
    def index
        if verify_token 
            render json: {:status => 200, :user_content => verify_token.contents}
        else 
            render json: {:status => 400, :errors => verify_token.errors.full_messages}
        end 
    end 

    def delete 
        content = Content.find(params[:content_id])
        content.delete
        render json: {:status => 200, :message => "Content Deleted"}
    end 

    def add 
        content = Content.create(description: params[:description], url: params[:url], image: params[:image], category: params[:category], user_id: verify_token.id)
        if content.save 
            render json: {:status => 200, :message => "Content added"}
        else 
            render json: {:status => 400, :errors => content.errors.full_messages}
        end 
    end 

    private 
    def verify_token
        token = params[:jwt]
        hmac_secret = '$ecr#tK@Y&'
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256'}
        
        user = User.find_by(username: decoded_token[0]["user_name"])
        return user 
    end 
end
