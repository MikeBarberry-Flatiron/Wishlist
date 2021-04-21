require 'jwt'

class HomepageController < ApplicationController
    def index
        if verify_token 
            all = verify_token.contents.order(created_at: :asc)
            lifestyle = Content.where(:category => "lifestyle", :user_id => verify_token.id).order(created_at: :asc)
            clothing = Content.where(:category => "clothing", :user_id => verify_token.id).order(created_at: :asc)
            technology = Content.where(:category => "technology", :user_id => verify_token.id).order(created_at: :asc)
            household = Content.where(:category => "household", :user_id => verify_token.id).order(created_at: :asc)

            render json: { :status => 200, :all_content => all, :lifestyle_content => lifestyle, :clothing_content => clothing, :technology_content => technology, :household_content => household }
        else 
            render json: { :status => 400, :errors => verify_token.errors.full_messages }
        end 
    end 

    def recent 
        # let users set post to private so it doesn't show up on recents in other people's page
        new_posts =  Content.where("created_at > ?", 3.days.ago).order(created_at: :desc).limit(3)
        data = []
        new_posts.each do |post|
            h = {}
            h[:category] = post.category
            h[:description] = post.description
            h[:image] = post.image
            h[:user] = post.user.username
            data << h 
        end 

        render json: { :status => 200, :new_posts => data }
    end 

    def delete 
        content = Content.find(params[:content_id])
        content.delete
        render json: { :status => 200, :message => "Content Deleted" }
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
        hmac_secret = ENV["HMAC_SECRET"]
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256'}
        
        user = User.find_by(username: decoded_token[0]["user_name"])
        return user 
    end 
end
