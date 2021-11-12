class CreateMedications < ActiveRecord::Migration[6.1]
  def change
    create_table :medications do |t|
      t.string :generic_name
      t.string :dosage
      t.string :brand_name

      t.timestamps
    end
  end
end
