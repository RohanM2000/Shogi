# == Schema Information
#
# Table name: standard_queue_positions
#
#  id                :bigint           not null, primary key
#  standard_queue_id :bigint           not null
#  user_id           :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class StandardQueuePosition < ApplicationRecord
  belongs_to :standard_queue
  belongs_to :user

  def attempt_to_match
    second_pos = StandardQueuePosition.where(standard_queue_id: self.standard_queue_id).where.not(user_id: self.user_id)
    return false if second_pos.length < 1
    other_id = second_pos[0].user_id
    current_id = self.user_id
    new_game = Game.create!(white_id: other_id, black_id: current_id, body: "", queue_id: self.standard_queue_id)
    new_room = Room.create!(game_id: new_game.id)
    self.destroy!
    second_pos[0].destroy!
    return new_game.id
  end
end
