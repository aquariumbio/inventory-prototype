# container_types controller
module Api
  module V1
    class ContainerTypesController < ApplicationController
      def index
        sql = "select * from container_types order by name, id"
        results = ContainerType.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        container_type_params = params.require(:container_type).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        container_type = ContainerType.new(container_type_params)

        # return status :ok for form errors
        render json: {errors: container_type.errors.full_messages}.to_json, status: :ok and return if !container_type.save

        # return container_type
        render json: container_type.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "select * from container_types where id = #{id} limit 1"
        results = (ContainerType.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end

    end
  end
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

