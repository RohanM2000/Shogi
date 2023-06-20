class RoomsChannel < ApplicationCable::Channel
  def subscribed
    @room = Room.find_by(game_id: params[:id])
    stream_for @room
  end
end