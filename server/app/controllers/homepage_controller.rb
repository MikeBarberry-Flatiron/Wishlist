require 'jwt'

class HomepageController < ApplicationController
    def index
        if verify_user 
            user_content = verify_user.contents.order(created_at: :asc)

            render json: { :status => 200, :user_content => user_content, :new_posts => new_content }
        else 
            render json: { :status => 400, :errors => verify_user.errors.full_messages }
        end 
    end 


    def delete 
        content = Content.find(params[:content_id])
        content.delete

        updated_content = verify_user.contents.order(created_at: :asc)
        render json: { :status => 200, :message => "Content Deleted", :updated => { :updated_content => updated_content, :new_content => new_content} }
    end 

    def add 
        content = Content.create(description: params[:description], url: params[:url], image: params[:image], category: params[:category], user_id: verify_user.id)
        if content.save 
    
            render json: {:status => 200, :message => "Content added", :updated => { :updated_content => content, :new_content => new_content} }
        else 
            render json: {:status => 400, :errors => content.errors.full_messages}
        end 
    end 

    def like 
        content = Content.find(params[:content_id])
        content.likes += 1
        content.save
        render json: { :status => 200, :message => "Like Added", :updated_likes => new_content }
    end 

    private 
    def verify_user
        token = params[:jwt]
        hmac_secret = ENV["HMAC_SECRET"]
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256'}
        
        user = User.find_by(username: decoded_token[0]["user_name"])
        return user 
    end 

    def new_content 
        new_posts =  Content.where("created_at > ?", 3.days.ago).order(created_at: :desc).limit(3)
            data = []
            new_posts.each do |post|
                h = {}
                h[:id] = post.id
                h[:category] = post.category
                h[:description] = post.description
                h[:image] = post.image
                h[:user] = post.user.username
                h[:likes] = post.likes
                data << h 
            end 
        return data 
    end 
end
