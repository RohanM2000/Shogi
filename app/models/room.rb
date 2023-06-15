# == Schema Information
#
# Table name: rooms
#
#  id         :bigint           not null, primary key
#  owner_id   :bigint           not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Room < ApplicationRecord
    belongs_to :owner, class_name: :User
    has_many :messages, dependent: :destroy
end
