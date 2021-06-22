# locations table
class Location < ActiveRecord::Base
  attr_accessor :labels, :sizes
  
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :spec_labels, presence: true
  validates :spec_sizes, presence: true
  validates :spec_json, presence: true
end
#
# locations
# - id
# - name
# - description
# - specification
