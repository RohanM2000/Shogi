# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :username, length: {in: 3..30}, format: {without: URI::MailTo::EMAIL_REGEXP, message: "can't be a valid email"}, uniqueness: true
  validates :email, length: {in: 3..255}, format: {with: URI::MailTo::EMAIL_REGEXP}, uniqueness: true
  validates :password, length: {in: 6..255}, allow_nil: true
  validates :session_token, uniqueness: true, presence: true

  before_validation :ensure_session_token

  has_many :games_as_white, class_name: :Game, inverse_of: :white
  has_many :games_as_black, class_name: :Game, inverse_of: :black

  def self.find_by_credentials(usernameEmail, password)
    if URI::MailTo::EMAIL_REGEXP.match(usernameEmail)
      user = User.find_by(email: usernameEmail)
    else  
      user = User.find_by(username: usernameEmail)
    end
    return user ? user.authenticate(password) : false
  end


  def reset_session_token!
    update!(session_token: generate_unique_session_token)
    return session_token
  end

  private

  def generate_unique_session_token
    loop do
      session_token = SecureRandom.base64
      return session_token unless User.exists?(session_token: session_token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
