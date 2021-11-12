class Doctor < ApplicationRecord
    has_many :prescriptions, dependent: :destroy
    has_many :medications,through: :prescriptions 

    validates :name, presence: true
    validates :profession, presence: true
end
