class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities

    user ||= User.new
    Rails.logger.debug "\nIn Cancancan's ability.rb's initialize method user = #{user.username}; role = #{user.role.inspect}\n" unless user.blank?
    Rails.logger.debug "\nIn Cancancan's ability.rb's initialize method user = nil" if user.blank?
    if user.role == 'ROLE_SUPER'  && user.user_status.code == 'ACT'
      can :manage, :all
      can :access, :rails_admin   # grant access to rails_admin
      can :dashboard              # grant access to the dashboard
    elsif user.role == 'ROLE_ADMIN'  && user.user_status.code == 'ACT'
        can :manage, :all
        can :access, :rails_admin   # grant access to rails_admin
        can :dashboard              # grant access to the dashboard
    elsif user.role == 'ROLE_CURATOR' && user.user_status.code == 'ACT'
      can :manage, [Organization, Person, Family, Comment, AssociatedTrial]
      can :read, :all
      can :search, :all
      can :search_pa, Trial
      cannot :access_backoffice, :manage_backoffice
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard              # grant access to the dashboard
    elsif user.role == "ROLE_RO"  && user.user_status.code == 'ACT'
      can :read, :all
      can :search, :all
      can [:create, :update], User
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard              # grant access to the dashboard
    elsif user.role == 'ROLE_TRIAL-SUBMITTER' && user.user_status.code == 'ACT'
      can :manage, [Trial, AssociatedTrial]
      can :unique, Organization
      can :read, :all
      can :search, :all
      cannot :access_backoffice, :manage_backoffice
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard              # grant access to the dashboard
    elsif user.role == 'ROLE_ACCRUAL-SUBMITTER' && user.user_status.code == 'ACT'
      can :read, :all
      can :search, :all
      cannot :access_backoffice, :manage_backoffice
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard
    elsif user.role == 'ROLE_SITE-SU' && user.user_status.code == 'ACT'
      can :manage, [Trial, Comment, AssociatedTrial, Family]
      can :read, :all
      can :search, :all
      cannot :access_backoffice, :manage_backoffice
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard
    elsif user.role == 'ROLE_ABSTRACTOR' && user.user_status.code == 'ACT'
      can :manage, [Trial, Comment, AssociatedTrial, Family]
      can :unique, Organization
      can :read, :all
      can :search, :all
      cannot :access_backoffice, :manage_backoffice
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard              # grant access to the dashboard
    elsif user.role == 'ROLE_ABSTRACTOR-SU' && user.user_status.code == 'ACT'
      can :manage, [Trial, Comment, AssociatedTrial, Family]
      can :read, :all
      can :search, :all
      cannot :access_backoffice, :manage_backoffice
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard              # grant access to the dashboard
    elsif user.role == 'ROLE_ACCOUNT-APPROVER' && user.user_status.code == 'ACT'
      can :manage, [User]
      can :read, :all
      can :search, :all
      cannot :access_backoffice, :manage_backoffice
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard              # grant access to the dashboard
    else
      can [:create, :update], User
      cannot :access, :rails_admin   # grant access to rails_admin
      cannot :dashboard              # grant access to the dashboard
      cannot :access_backoffice, :manage_backoffice
      Rails.logger.info "No permission to access any resources in CTRP."
    end
  end
end
