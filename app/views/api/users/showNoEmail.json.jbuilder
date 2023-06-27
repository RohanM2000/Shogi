json.user do
    json.extract! @user, :id, :username, :created_at
    json.photoUrl @user.photo.attached? ? @user.photo.url : nil 

    json.elos do 
        json.array! @user.elos do |elo|
            json.extract! elo, :rating, :created_at
        end
    end
end