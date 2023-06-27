class AddQueueTypeToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :queue_id, :bigint, null: false
    add_foreign_key :games, :standard_queues, column: :queue_id
  end
end
