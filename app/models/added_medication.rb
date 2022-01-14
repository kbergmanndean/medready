class AddedMedication < ApplicationRecord
    belongs_to :user

    has_many :prescriptions
    has_many :doctors, through: :prescriptions
    has_many :users, through: :prescriptions
    
    validates :dosage, presence: true
    validates :generic_name, presence: true
    validates :brand_name, presence: true
    validates :user_id, presence: true

end
