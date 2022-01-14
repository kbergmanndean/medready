class Prescription < ApplicationRecord
    belongs_to :doctor
    belongs_to :medication
    belongs_to :user
    belongs_to :added_medication

    validates :daily_dosage, presence: true
    validates :directions, presence: true 
    validates :doses_in_container, presence: true, numericality: true
    validates :doctor_id, presence: true 
    # validates :medication_id, presence: true
    validates :date_given, presence: true
end
