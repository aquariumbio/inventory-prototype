# container_types table
class ContainerType < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :container_class, inclusion: { in: ['single', 'collection'] }
  validates :rows, presence: true, if: -> {container_class == 'collection'}
  validates :columns, presence: true, if: -> {container_class == 'collection'}
  validates :max_volume, presence: true

end
#
# container_types
# - id
# - name
# - description
# - container_class = single, collection
# - rows
# - columns
# - max_volume

