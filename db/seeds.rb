# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
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
    User.create!(
      username: 'pig lover', 
      email: 'pig@user.io', 
      password: 'password'
    )

    User.create!(
      username: 'cow lover', 
      email: 'cow@user.io', 
      password: 'password'
    )

    User.create!(
      username: 'orca lover', 
      email: 'orca@user.io', 
      password: 'password'
    )

    User.create!(
      username: 'shark lover', 
      email: 'shark@user.io', 
      password: 'password'
    )
  

    puts "Creating queues..."

    StandardQueue.create!()
    StandardQueue.create!()
    StandardQueue.create!()
  
    puts "Done!"
  end