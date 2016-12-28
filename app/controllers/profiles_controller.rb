class ProfilesController < ApplicationController
   
    # GET to /users/:user_id/profile/new
    def new
        # Render blank profile details form
        @profile = Profile.new
    end
    
    # POST to /users/:user_id/profiles
    def create
        # Ensure that we have the correct user filling out form
        @user = User.find( params[:user_id] )
        # Create profile linked to this specific user
        @profile = @user.build_profile( profile_params )
        if @profile.save
           flash[:success] = "Profile updated!"
           redirect_to user_path(id: params[:user_id] )
        else
           render action: :new
        end
    end 
    
    # GET to /users/:user_id/profile/edit
    def edit
        @user = User.find( params[:user_id] )
        @profile = @user.profile
    end
    
    # PATCH to /users/:user_id/profile/
    def update
        # Retrive the user from the database
        @user = User.find( params[:user_id] )
        # Retrive user profile
        @profile = @user.profile
        
        # Mass assign edited profile attributes and save (update)
        if @profile.update_attributes(profile_params)
           flash[:success] = "Profile updated!"
           # Redirect user to their profile page
           redirect_to user_path( id: params[:user_id] )
        else 
            render action: :edit
        end
    end
    
    
    
    private
        def profile_params
           params.require(:profile).permit(:first_name, :last_name, :avatar, :title, :phone_number, :contact_email, :description) 
        end
end