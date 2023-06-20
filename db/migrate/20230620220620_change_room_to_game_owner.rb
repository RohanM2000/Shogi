class ChangeRoomToGameOwner < ActiveRecord::Migration[7.0]
  def change
    remove_column :rooms, :name
    remove_column :rooms, :owner_id
    add_column :rooms, :game_id, :bigint, null: false
    add_foreign_key :rooms, :games, column: :game_id

  end
end
