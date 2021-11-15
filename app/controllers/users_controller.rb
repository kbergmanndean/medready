class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :show, :index]

    def index
        users=User.all
        render json: users, include: [:prescriptions, :doctors]
    end
    
    def create
        user=User.create(user_params)
        session[:user_id]=user.id
        if user.valid?
            render json:user, status: :created, include: [:prescriptions, :doctors]
        else
            render json: {error:user.errors.full_messages}
        end
    end

    def show
        usershow=User.find_by(id:params[:id])
        render json: usershow, include: [:prescriptions, :doctors]
    end
        
    private

    def user_params
        params.require(:user).permit(:user_name,:password)
    end
end
