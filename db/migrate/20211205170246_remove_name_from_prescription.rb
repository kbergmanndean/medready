class RemoveNameFromPrescription < ActiveRecord::Migration[6.1]
  def change
    remove_column :prescriptions, :name, :string
  end
end
