class User < ApplicationRecord
    
    has_many :medications, through: :prescriptions
    has_many :prescriptions
    has_many :doctors
    
    has_secure_password

    validates :user_name, presence:{message: "invalid username and/or password"}, uniqueness:true 
    validates :password, presence:true
end
