# item_states table
class ItemState < ActiveRecord::Base
  validate  :item_id?
  validate  :state_id?

  private

  def item_id?
    errors.add(:item_id, 'not valid')  if !Item.find_by(id: item_id)
  end

  def state_id?
    errors.add(:state_id, 'not valid')  if !State.find_by(id: state_id)
  end
end
#
# item_states
# - id
# - item_id
# - state_id
# - value
