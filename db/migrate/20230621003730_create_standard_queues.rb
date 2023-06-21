class CreateStandardQueues < ActiveRecord::Migration[7.0]
  def change
    create_table :standard_queues do |t|

      t.timestamps
    end
  end
end
