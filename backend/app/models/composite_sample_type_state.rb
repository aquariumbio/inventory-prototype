# composite_sample_type_states table
class CompositeSampleTypeState < ActiveRecord::Base
  validate  :composit_sample_type_id?
  validate  :state_id?

  private

  def sample_type_id?
    errors.add(:composite_sample_type_id, 'not valid')  if !CompositeSampleType.find_by(id: composite_sample_type_id)
  end

  def state_id?
    errors.add(:state_id, 'not valid')  if !State.find_by(id: state_id)
  end
end
#
# composite_sample_type_states
# - id
# - composite_sample_type_id
# - state_id
