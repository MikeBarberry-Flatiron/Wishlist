require 'jwt'

class UsersController < ApplicationController
    def register 
        user = User.create(username: params[:username], password: params[:password])
        if user.save 
            content1 = Content.create(title: "Xenia", image: "https://cdn.shoplightspeed.com/shops/609770/files/11435268/600x600x2/pulsing-xenia-frag-1-2.jpg", description: "some strains will pulse in low flow conditions", user_id: user.id)
            content2 = Content.create(title: "Candy Cane", image: "https://www.reef2reef.com/ams/beginner-coral-candy-cane-trumpet.260/cover-image", description: "easy to grow and looks great", user_id: user.id)
            content3 = Content.create(title: 'Zoa', image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MrKksf9_em_dAu_9l-7mNgHaEJ%26pid%3DApi&f=1", description: "some random zoa garden", user_id: user.id)
            content4 = Content.create(title: "Chalice", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jbOxoMlqXC6Idc0jFyJR9QHaHn%26pid%3DApi&f=1", description: "nice looking coral; grows kind of like a rug", user_id: user.id)
            content5 = Content.create(title: "Finger leather", image: "https://c1.staticflickr.com/5/4037/4347301073_41a681a1a2_b.jpg", description: "soft coral that likes high flow", user_id: user.id)
            content1.save
            content2.save
            content3.save
            content4.save
            content5.save

            render :status => 201, :json => {:message => "User registered"}
        else 
            render json: {errors: user.errors.full_messages }, status: 400 
        end 
    end 

    def login
        user = User.find_by(:username => params[:username])

        if user && user.authenticate(params[:password])
            payload = { user_name: user.username }
            hmac_secret = ENV["HMAC_SECRET"]
            token = JWT.encode payload, hmac_secret, 'HS256'
            
            render json: { :status => 200, :message => "Logged In", :jwt => token } 
        else 
            render json: { :status => 401, :message => "Authentication Failed" } 
        end 
    end 
end
