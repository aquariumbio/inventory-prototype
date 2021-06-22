# items controller
module Api
  module V1
    class ItemsController < ApplicationController
      def index
        sql = "
          select i.*, ct.container_class, 
          st.name as 'sample_type', stc.name as 'sample_category', 
          cst.name as 'composite_sample_type', cst.composite_sample_class
          from items i
          left join sample_types st on st.id = i.sample_type_id
          left join sample_type_categories stc on stc.id = st.sample_type_category_id
          left join composite_sample_types cst on cst.id = i.composite_sample_type_id
          left join containers c on c.id = i.container_id
          left join container_types ct on ct.id = c.container_type_id
          order by i.name, i.id
        "
        results = Item.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        item_params = params.require(:item).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        item = Item.new(item_params)

        item.sample_type_id = nil if item.sample_type_id == 0 or item.sample_class != 'sample'
        item.composite_sample_type_id = nil if item.composite_sample_type_id == 0 or item.sample_class != 'composite_sample'
        item.container_id = nil if item.container_id == 0
        # move location to container.create
        # item.location_id = nil if item.location_id == 0
        # item.location = nil if item.location == ''

        # return status :ok for form errors
        render json: {errors: item.errors.full_messages}.to_json, status: :ok and return if !item.save

        # return item
        render json: item.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "
          select i.*, ct.container_class, 
          st.name as 'sample_type', stc.name as 'sample_category', 
          cst.name as 'composite_sample_type', cst.composite_sample_class
          from items i
          left join sample_types st on st.id = i.sample_type_id
          left join sample_type_categories stc on stc.id = st.sample_type_category_id
          left join composite_sample_types cst on cst.id = i.composite_sample_type_id
          left join containers c on c.id = i.container_id
          left join container_types ct on ct.id = c.container_type_id
          where i.id = #{id} limit 1
        "
        results = (Item.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
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

