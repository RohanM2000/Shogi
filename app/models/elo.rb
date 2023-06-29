# == Schema Information
#
# Table name: elos
#
#  id         :bigint           not null, primary key
#  rating     :bigint           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  game_id    :bigint           not null
#
class Elo < ApplicationRecord
  validates :rating, :user, presence: true
  validates :user_id, uniqueness: {scope: :game_id}
  
  belongs_to :user
end
