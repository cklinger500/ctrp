
json.trial_ownerships do
  json.array!(@trial_ownerships) do |trial_ownership|

    json.extract! trial_ownership, :id, :trial_id, :user_id
    json.last_name trial_ownership.user ? trial_ownership.user.last_name : ''
    json.first_name trial_ownership.user ? trial_ownership.user.first_name : ''
    json.middle_name trial_ownership.user ? trial_ownership.user.middle_name : ''
    json.username trial_ownership.user ? trial_ownership.user.username : ''
    json.nci_id trial_ownership.trial ? trial_ownership.trial.nci_id : ''
    json.official_title trial_ownership.trial ? trial_ownership.trial.official_title : ''
    json.start_date trial_ownership.trial ? trial_ownership.trial.start_date : ''
    json.comp_date trial_ownership.trial ? trial_ownership.trial.comp_date : ''

  end
end