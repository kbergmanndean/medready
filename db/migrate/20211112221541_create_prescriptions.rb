class CreatePrescriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :prescriptions do |t|
      t.float :daily_dosage
      t.string :directions
      t.integer :doses_in_container
      t.integer :doctor_id
      t.integer :medication_id
      t.integer :user_id
      t.date :date_given

      t.timestamps
    end
  end
end

