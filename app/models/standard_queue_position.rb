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
    second_pos = StandardQueuePosition.where(standard_queue_id: this.standard_queue_id).where.not(user_id: this.user_id)
    return false if second_pos.length < 1
    other_id = second_pos[0].user_id
    current_id = this.user_id
    new_game = Game.create!(white_id: other_id, black_id: current_id, body: "")
    new_room = Room.create!(game_id: new_game.id)
    this.destroy!
    second_pos[0].destroy!
    return new_game.id
  end
end
