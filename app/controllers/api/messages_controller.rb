class Api::MessagesController < ApplicationController
    def create
        @message = Message.new(message_params)
        @current_user = current_user
        if current_user.id != params[:message][:author_id]
            render json: { error: "Cannot create a message for another user."}
        elsif @message.save
            RoomsChannel.broadcast_to(@message.room, @message)
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    private
    def message_params
        params.require(:message).permit(:body,:room_id,:author_id)
    end
end
