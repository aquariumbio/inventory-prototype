# composite_sample_type_recipes table
class CompositeSampleTypeRecipe < ActiveRecord::Base
  validate  :composite_sample_type_id?
  validate  :sample_type_id?

  private

  def composite_sample_type_id?
  puts ">>> check 1"
    errors.add(:composite_sample_type_id, 'not valid')  if !CompositeSampleType.find_by(id: composite_sample_type_id)
  end

  def sample_type_id?
  puts ">>> check 2"
    errors.add(:sample_type_id, 'not valid')  if !SampleType.find_by(id: sample_type_id)
  end
end
#
# composite_sample_type_recipes
# - id
# - composite_sample_type_id
# - sample_type_id
