class GamesChannel < ApplicationCable::Channel
    def subscribed
        @game = Game.find_by(id: params[:id])
        stream_for @game
    end
end