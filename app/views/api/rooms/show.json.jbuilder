json.room do
    json.partial! 'api/rooms/room', room: @room
end

json.messages do
    json.array! @room.messages do |message|
        json.author message.author.username
        json.extract! message, :room_id, :body, :created_at, :id
    end
end

