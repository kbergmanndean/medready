class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :name, :profession, :user_id
end
