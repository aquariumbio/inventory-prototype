# locations controller
module Api
  module V1
    class LocationsController < ApplicationController
      def index
        sql = "select * from locations order by name, id"
        results = Location.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        location_params = params.require(:location).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        location = Location.new(location_params)
        
        # add specification from labels / sizez
        pl = location_params[:labels]
        ps = location_params[:sizes]
        json_spec = []
        ll = []
        ss = []
        pl.each_with_index do |pll, index|
          l = pll.strip == "" ? "Label" : pll.strip
          s = ps[index].to_i < 1 ? 1 : ps[index].to_i
          json_spec << { label: l, size: s }
          ll << l
          ss << s
        end
        location.spec_json = json_spec.to_json
        location.spec_labels = "#{ll.join(".")}"
        location.spec_sizes = "#{ss.join(".")}"
        
        # return status :ok for form errors
        render json: {errors: location.errors.full_messages}.to_json, status: :ok and return if !location.save

        # return location
        render json: location.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "select * from locations where id = #{id} limit 1"
        results = (Location.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end

    end
  end
end
#
# locations
# - id
# - name
# - description
# - specification

