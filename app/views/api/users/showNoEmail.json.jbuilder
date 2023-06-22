json.user do
    json.extract! @user, :id, :username, :created_at
    json.photoUrl @user.photo.attached? ? @user.photo.url : nil 
end