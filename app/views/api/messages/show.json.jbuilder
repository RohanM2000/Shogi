json.extract! @message, :body, :room_id, :created_at, :id
json.author @current_user.username