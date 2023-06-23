class ChangeGamesTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :result
    add_column :games, :status, :string, default: "started"
  end
end
