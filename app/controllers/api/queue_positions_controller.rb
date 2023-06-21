class Api::QueuePositionsController < ApplicationController
    def create
        @position = StandardQueuePosition.new(queue_position_params, user_id: current_user.id)


        if @position.save
            result = @position.attempt_to_match

            if result
                render json: {gameId: result, status: "matched up with another user"}
            else
                render json: {status: "waiting for a match", position: @position}
            end
        else
            render json: { errors: @position.errors.full_messages }, error: 422 
        end

    end

    def destroy
        @position = StandardQueuePosition.find_by(id: params[:id])
        if @position
            @position.destroy
        end
        render json: {status: "removed from the queue"}
    end

    private
    def queue_position_params
        params.require(:queue_position).permit(:standard_queue_id)
    end
end
