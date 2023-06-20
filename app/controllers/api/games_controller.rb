class Api::GamesController < ApplicationController
    def create
        @game = Game.new(game_params, body: "")

        if @game.save
            @room.create(game_id: @game.id)
            render :show
        else
            render json: {errors: @game.errors.full_messages}, status: 422
        end
    end

    def show
        @game = Game.find_by(id: params[:id])

        render json: @game
    end

    def update
        @game = Game.find_by(id: params[:id])

        if @game.make_move(params[:move])
            GamesChannel.broadcast_to(@game, @game)
            render json: @game
        else 
            render json: {errors: @game.errors.full_messages}, status: 422
        end
    end

    def game_params
        params.require(:game).permit(:black_id, :white_id)
    end
end
