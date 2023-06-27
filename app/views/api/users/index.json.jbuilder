json.users do 
    json.array! @users do |user|
        json.extract! user, :id, :username, :created_at
        json.photoUrl user.photo.attached? ? user.photo.url : nil 

        json.elos do 
            json.array! user.elos do |elo|
                json.extract! elo, :rating, :created_at
            end
        end
    end
end