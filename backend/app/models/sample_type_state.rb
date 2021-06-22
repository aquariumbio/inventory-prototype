# sample_type_states table
class SampleTypeState < ActiveRecord::Base
  validate  :sample_type_id?
  validate  :state_id?

  private

  def sample_type_id?
    errors.add(:sample_type_id, 'not valid')  if !SampleType.find_by(id: sample_type_id)
  end

  def state_id?
    errors.add(:state_id, 'not valid')  if !State.find_by(id: state_id)
  end
end
#
# sample_type_states
# - id
# - sample_type_id
# - state_id
