class AddUserIdToMedications < ActiveRecord::Migration[6.1]
  def change
    add_column :medications, :user_id, :integer
  end
end
