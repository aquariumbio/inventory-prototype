# items table
class Item < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :sample_class, inclusion: { in: ['sample', 'composite_sample'] }

  validate  :sample_type_id?
  validate  :composit_sample_type_id?

  validate  :container_id?

  private

  def sample_type_id?
    if sample_class=='sample'
      if !sample_type_id
        errors.add(:sample_type_id, 'required')  
      elsif !SampleType.find_by(id: sample_type_id)
        errors.add(:sample_type_id, 'not valid')  
      end
    end
  end

  def composit_sample_type_id?
    if sample_class=='composite_sample'
      if !composite_sample_type_id
        errors.add(:composite_sample_type_id, 'required')  
      elsif !CompositeSampleType.find_by(id: composite_sample_type_id)
        errors.add(:composite_sample_type_id, 'not valid')  
      end
    end
  end

  def container_id?
    if !container_id
      errors.add(:container_id, 'required')
    else
      sql = "
        select ct.container_class
        from containers c
        inner join container_types ct on ct.id = c.container_type_id
        where c.id = #{container_id.to_i} limit 1
      "
      temp = (ContainerType.find_by_sql sql)[0]
      if !temp
        errors.add(:container_id, 'not valid')
      elsif temp.container_class == 'collection'
        errors.add(:container_row, 'required') if !container_row
        errors.add(:container_column, 'required') if !container_column
      end
    end
  end

end
#
# items
# - id
# - name
# - description
# - sample_class = sample, composite_sample
# - sample_type_id
# - composite_sample_type_id
# - container_id
# - container_row
# - container_column
