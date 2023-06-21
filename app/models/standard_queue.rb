# == Schema Information
#
# Table name: standard_queues
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class StandardQueue < ApplicationRecord
    has_many :standard_queue_positions, dependent: :destroy
end
