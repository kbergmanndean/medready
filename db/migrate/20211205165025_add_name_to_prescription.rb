class AddNameToPrescription < ActiveRecord::Migration[6.1]
  def change
    add_column :prescriptions, :name, :string
  end
end
