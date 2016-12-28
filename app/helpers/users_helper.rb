module UsersHelper
    def title_icon
        if @user.profile.title == "Pet"
            "<i class= 'fa fa-gittip'></i>".html_safe
        elsif @user.profile.title == "Prospective Owner"
            "<i class= 'fa fa-smile-o'></i>".html_safe
        end
    end
end