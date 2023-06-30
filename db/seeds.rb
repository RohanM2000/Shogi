require "open-uri"
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Elo.destroy_all
    puts "elo done"
    Message.destroy_all
    puts "message done"
    Room.destroy_all
    puts "room done"
    Game.destroy_all
    puts "game done"
    StandardQueuePosition.destroy_all
    puts "positions done"
    StandardQueue.destroy_all
    puts "queue done"
    User.destroy_all
    puts "users done"
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('rooms')
    ApplicationRecord.connection.reset_pk_sequence!('messages')
    ApplicationRecord.connection.reset_pk_sequence!('games')
    ApplicationRecord.connection.reset_pk_sequence!('standard_queues')
    ApplicationRecord.connection.reset_pk_sequence!('standard_queue_positions')
    ApplicationRecord.connection.reset_pk_sequence!('elos')

  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    pig = User.new(
      username: 'pig lover', 
      email: 'pig@user.io', 
      password: 'password'
    )

    file = URI.open("https://shogi-seeds.s3.us-west-1.amazonaws.com/pig_picture.jpg")
    pig.photo.attach(io: file, filename: "default.jpg")

    cow = User.new(
      username: 'cow lover', 
      email: 'cow@user.io', 
      password: 'password'
    )

    file = URI.open("https://shogi-seeds.s3.us-west-1.amazonaws.com/cow_picture.jpg")
    cow.photo.attach(io: file, filename: "default.jpg")

    orca = User.new(
      username: 'orca lover', 
      email: 'orca@user.io', 
      password: 'password'
    )

    file = URI.open("https://upload.wikimedia.org/wikipedia/commons/3/37/Killerwhales_jumping.jpg")
    orca.photo.attach(io: file, filename: "default.jpg")

    shark = User.new(
      username: 'shark lover', 
      email: 'shark@user.io', 
      password: 'password'
    )
  
    file = URI.open("https://upload.wikimedia.org/wikipedia/commons/5/56/White_shark.jpg")
    shark.photo.attach(io: file, filename: "default.jpg")


    pig.save!
    cow.save!
    orca.save!
    shark.save!
    
    puts "Creating queues..."

    StandardQueue.create!()
    StandardQueue.create!()
    StandardQueue.create!()
  
    puts "Done!"