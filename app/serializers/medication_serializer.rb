class MedicationSerializer < ActiveModel::Serializer
  attributes :id, :generic_name, :dosage, :brand_name, :user_id
end
