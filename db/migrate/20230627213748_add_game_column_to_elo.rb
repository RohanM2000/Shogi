class AddGameColumnToElo < ActiveRecord::Migration[7.0]
  def change
    add_column :elos, :game_id, :bigint, null: false
    add_index :elos, [:user_id, :game_id], unique: true
  end
end
