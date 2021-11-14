class AddUserIdToDoctors < ActiveRecord::Migration[6.1]
  def change
    add_column :doctors, :user_id, :integer
  end
end
