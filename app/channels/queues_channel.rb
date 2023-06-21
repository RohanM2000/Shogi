class QueuesChannel < ApplicationCable::Channel
    def subscribed
        @queue = StandardQueue.find_by(id: params[:id])
        stream_for @queue
    end

    def unsubscribed
        @position = StandardQueuePosition.find_by(user_id: params[:user_id])
        if @position
            @position.destroy
        end
    end
end