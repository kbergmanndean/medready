class PrescriptionSerializer < ActiveModel::Serializer
  attributes :id, :daily_dosage, :directions, :doses_in_container, :doctor_id, :medication_id, :user_id
end
