class AddMoveDataToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :move_data, :string, default: ""
  end
end
