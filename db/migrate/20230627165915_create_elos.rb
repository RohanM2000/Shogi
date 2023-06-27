class CreateElos < ActiveRecord::Migration[7.0]
  def change
    create_table :elos do |t|
      t.bigint :rating, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
