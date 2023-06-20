class Api::RoomsController < ApplicationController
    # def create
    #     @room = Room.new(room_params)

    #     if @room.save
    #         render :show
    #     else
    #         render json: @room.errors.full_messages, status: 422
    #     end
    # end

    def show
        @room = Room.includes(messages: [:author]).find_by(game_id: params[:id])

        render :show
        # render json: {room: @room, messages: @room.messages}
    end

    private
    def room_params
        params.require(:room).permit(:owner_id, :name)
    end
end
