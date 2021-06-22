# containers table
class Container < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true

  validate  :container_type_id?
  validate  :location_id?

  private

  def container_type_id?
    errors.add(:container_type_id, 'not valid') if !ContainerType.find_by(id: container_type_id)
  end

  def location_id?
    if location_id
      if !Location.find_by(id: location_id)
        errors.add(:location_id, 'not valid')
#       elsif !location
#         errors.add(:location, 'required')
      end
    end
  end
end
#
# containers
# - id
# - name
# - description
# - container_type_id
# - location_id
# - location
