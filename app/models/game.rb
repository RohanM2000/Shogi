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
#  status     :string           default("started")
#  move_data  :string           default("")
#  queue_id   :bigint           not null
#
class Game < ApplicationRecord
    validates :white_id, :black_id, presence: true
    belongs_to :white, class_name: :User, foreign_key: :white_id
    belongs_to :black, class_name: :User, foreign_key: :black_id
    belongs_to :queue, class_name: :StandardQueue
    has_one :room, dependent: :destroy

    def make_move(move, status) 
        return self if self.status == "white won" || self.status == "black won"
        move_data = self.move_data.to_s + " " + Time.now.to_f.to_s
        if status == 'white won'
            adjust_elos("white")
        end
        if status == "black won"
            adjust_elos("black")
        end
        if move.to_s == "time over"    
            return self.update(status: status, move_data: move_data)
        end
        body = self.body.to_s + " " + move.to_s
        self.update(body: body, status: status, move_data: move_data)
    end

    def adjust_elos(winner)
        white_rating = Elo.where(user_id: self.white_id).order("created_at").last.rating
        black_rating = Elo.where(user_id: self.black_id).order("created_at").last.rating

        prob_of_white_win = 1.0 / (1.0 + (10 ** ((black_rating - white_rating)/400.0)))
        prob_of_black_win = 1.0 / (1.0 + (10 ** ((white_rating - black_rating)/400.0)))

        if winner == "white"
            new_white_rating = white_rating + 25 * (1 - prob_of_white_win)
            new_black_rating = black_rating + 25 * (0 - prob_of_black_win)

            Elo.create(user_id: self.white_id, rating: new_white_rating, game_id: self.id)
            Elo.create(user_id: self.black_id, rating: new_black_rating, game_id: self.id)

        else
            new_white_rating = white_rating + 25 * (0 - prob_of_white_win)
            new_black_rating = black_rating + 25 * (1 - prob_of_black_win)

            Elo.create(user_id: self.white_id, rating: new_white_rating, game_id: self.id)
            Elo.create(user_id: self.black_id, rating: new_black_rating, game_id: self.id)
        end
    end
end
