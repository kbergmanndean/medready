class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :daily_dosage, :date_given, :directions, :doses_in_container, :doctor_id, :medication_id, :user_id
  
  has_one :medication
  has_one :doctor
  belongs_to :user
end
