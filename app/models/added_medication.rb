class AddedMedication < ApplicationRecord
    belongs_to :user

    validates :dosage, presence: true
    validates :generic_name, presence: true
    validates :brand_name, presence: true
    validates :user_id, presence: true

end
