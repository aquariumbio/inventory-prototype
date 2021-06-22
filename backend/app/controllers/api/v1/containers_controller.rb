# containers controller
module Api
  module V1
    class ContainersController < ApplicationController
      def index
        sql = "
          select c.*, ct.name as 'container_name', ct.container_class 
          from containers c
          inner join container_types ct on ct.id = c.container_type_id
          order by c.name, c.id
        "
        results = Container.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        container_params = params.require(:container).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        container = Container.new(container_params)
        container.location_id = nil if container.location_id == 0
        container.location = nil if container.location == ''

        # return status :ok for form errors
        render json: {errors: container.errors.full_messages}.to_json, status: :ok and return if !container.save

        # return container
        render json: container.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "
          select c.*, ct.name as 'container_name', ct.container_class,
          l.name as 'location_name'
          from containers c
          inner join container_types ct on ct.id = c.container_type_id
          left join locations l on l.id = c.location_id
          where c.id = #{id} limit 1
        "
        results = (Container.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end

    end
  end
end
#
# containers
# - id
# - name
# - description
# - container_type_id
# - location_id
# - location
