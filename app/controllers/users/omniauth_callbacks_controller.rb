class Users::OmniauthCallbacksController < ApplicationController
  def facebook
    user = User.find_or_create_from_facebook(request.env["omniauth.auth"])

    if user.persisted?
      sign_in user
      redirect_to root_path, notice: 'Successfully signed in'
    else
      session["devise.facebook_data"] =  request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to new_user_session_path
  end
end
