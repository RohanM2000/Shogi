class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.references :white, null: false, foreign_key: {to_table: :users}
      t.references :black, null: false, foreign_key: {to_table: :users}
      t.text :body
      t.timestamps
    end
  end
end
