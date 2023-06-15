json.users do 
    json.array! @users do |user|
        json.extract! user, :id, :username, :created_at
    end
end