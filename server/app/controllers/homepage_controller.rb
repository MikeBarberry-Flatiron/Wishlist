require 'jwt'

class HomepageController < ApplicationController
    def index
        if verify_user 
            all = verify_user.contents.order(created_at: :asc)
            lifestyle = Content.where(:category => "lifestyle", :user_id => verify_user.id).order(created_at: :asc)
            clothing = Content.where(:category => "clothing", :user_id => verify_user.id).order(created_at: :asc)
            technology = Content.where(:category => "technology", :user_id => verify_user.id).order(created_at: :asc)
            household = Content.where(:category => "household", :user_id => verify_user.id).order(created_at: :asc)

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
            render json: { :status => 200, :all_content => all, :lifestyle_content => lifestyle, :clothing_content => clothing, :technology_content => technology, :household_content => household, :new_posts => data }
        else 
            render json: { :status => 400, :errors => verify_user.errors.full_messages }
        end 
    end 


    def delete 
        content = Content.find(params[:content_id])
        content.delete
        render json: { :status => 200, :message => "Content Deleted" }
    end 

    def add 
        content = Content.create(description: params[:description], url: params[:url], image: params[:image], category: params[:category], user_id: verify_user.id)
        if content.save 
            render json: {:status => 200, :message => "Content added"}
        else 
            render json: {:status => 400, :errors => content.errors.full_messages}
        end 
    end 

    def like 
        content = Content.find(params[:content_id])
        content.likes += 1
        content.save
        render json: { :status => 200, :message => "Like Added" }
    end 

    private 
    def verify_user
        token = params[:jwt]
        hmac_secret = ENV["HMAC_SECRET"]
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256'}
        
        user = User.find_by(username: decoded_token[0]["user_name"])
        return user 
    end 
end
