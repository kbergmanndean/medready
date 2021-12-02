class AddDateToPrescriptions < ActiveRecord::Migration[6.1]
  def change
    add_column :prescriptions, :date, :date
  end
end
