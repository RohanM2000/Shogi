class AddResultToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :result, :string, default: "ongoing"
  end
end
