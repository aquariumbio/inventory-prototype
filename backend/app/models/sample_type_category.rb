# sample_type_categories table
class SampleTypeCategory < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
end
#
# sample_type_categories
# - id
# - name
# - description
