# == Schema Information
#
# Table name: games
#
#  id         :bigint           not null, primary key
#  white_id   :bigint           not null
#  black_id   :bigint           not null
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Game < ApplicationRecord
    validates :white_id, :black_id, presence: true
    belongs_to :white, class_name: :User
    belongs_to :black, class_name: :User
    has_one :room, dependent: :destroy

    def make_move(move, status) 
        body = self.body.to_s + " " + move.to_s
        self.update(body: body, status: status)
    end
end
