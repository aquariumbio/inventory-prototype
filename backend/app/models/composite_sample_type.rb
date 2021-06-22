# composite_sample_types table
class CompositeSampleType < ActiveRecord::Base
  attr_accessor :sample_type_ids

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :composite_sample_class, inclusion: { in: ['fixed', 'variable'] }
  validate  :sample_type_ids?
  
  def save_sample_type_ids
    sample_type_ids.each do |sample_type_id|
      # ignore invalid sample_types
      begin
        CompositeSampleTypeRecipe.create({
          composite_sample_type_id: id,
          sample_type_id: sample_type_id
        })
      rescue
      end
    end
  end
  
  private 
  
  def sample_type_ids?
    sample_type_ids.each do |sample_type_id|
      # ignore invalid sample_types
      sql = "select * from sample_types where id = #{sample_type_id.to_i} limit 1"
      errors.add(:sample_type_id, "#{sample_type_id} not valid") if !(SampleType.find_by_sql sql)[0]
    end
  end
end
#
# composite_sample_types
# - id
# - name
# - description
# - composite_sample_class =  fixed, variable

