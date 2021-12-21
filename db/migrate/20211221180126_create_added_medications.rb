class CreateAddedMedications < ActiveRecord::Migration[6.1]
  def change
    create_table :added_medications do |t|
      t.string :generic_name
      t.string :dosage
      t.string :brand_name
      t.integer :user_id

      t.timestamps
    end
  end
end
