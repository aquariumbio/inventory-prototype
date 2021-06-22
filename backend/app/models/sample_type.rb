# sample_types table
class SampleType < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true

  validate  :sample_type_category_id?

  private

  def sample_type_category_id?
    errors.add(:sample_type_category_id, 'not valid')  if !SampleTypeCategory.find_by(id: sample_type_category_id)
  end
end
#
# sample_types
# - id
# - name
# - description
# - sample_type_category_id
