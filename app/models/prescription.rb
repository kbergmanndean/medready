class Prescription < ApplicationRecord
    belongs_to :doctor
    belongs_to :medication
    belongs_to :user

    validates :daily_dosage, presence: true, numericality: true
    validates :directions, presence: true 
    validates :doses_in_container, presence: true, numericality: {only_integer: true}
    validates :doctor_id, presence: true 
    validates :medication_id, presence: true
end
