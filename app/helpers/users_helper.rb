module UsersHelper
    def title_icon
        if @user.profile.title == "Developer"
            "<i class= 'fa fa-code-fork'></i>".html_safe
        elsif @user.profile.title == "Entrepreneur"
            "<i class= 'fa fa-suitcase'></i>".html_safe
        elsif @user.profile.title == "Investor"
            "<i class= 'fa fa-dollar'></i>".html_safe
        end
    end
end