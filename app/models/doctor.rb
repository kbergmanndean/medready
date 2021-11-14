class Doctor < ApplicationRecord
    has_many :prescriptions, dependent: :destroy
    has_many :medications,through: :prescriptions 
    belongs_to :user

    validates :name, presence: true
    validates :profession, presence: true
end
