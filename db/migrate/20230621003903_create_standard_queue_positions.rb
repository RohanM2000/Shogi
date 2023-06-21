class CreateStandardQueuePositions < ActiveRecord::Migration[7.0]
  def change
    create_table :standard_queue_positions do |t|
      t.references :standard_queue, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
