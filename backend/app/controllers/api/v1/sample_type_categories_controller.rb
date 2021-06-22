# sample_type_categories controller
module Api
  module V1
    class SampleTypeCategoriesController < ApplicationController
      def index
        sql = "select * from sample_type_categories order by name, id"
        results = SampleTypeCategory.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        container_params = params.require(:sample_type_category).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        container = SampleTypeCategory.new(container_params)

        # return status :ok for form errors
        render json: {errors: container.errors.full_messages}.to_json, status: :ok and return if !container.save

        # return container
        render json: container.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "select * from sample_type_categories where id = #{id} limit 1"
        results = (SampleTypeCategory.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end

    end
  end
end
#
# sample_type_categories
# - id
# - name
# - description
