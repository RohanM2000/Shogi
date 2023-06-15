# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  room_id    :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
    belongs_to :room
    belongs_to :author, class_name: :User
end
