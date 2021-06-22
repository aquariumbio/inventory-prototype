# sample_types controller
module Api
  module V1
    class SampleTypesController < ApplicationController
      def index
        sql = "
          select st.*, stc.name as 'category' 
          from sample_types st
          inner join sample_type_categories stc on stc.id = st.sample_type_category_id
          order by stc.name, st.name, st.id 
        "
        results = SampleType.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        sample_type_params = params.require(:sample_type).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        sample_type = SampleType.new(sample_type_params)

        # return status :ok for form errors
        render json: {errors: sample_type.errors.full_messages}.to_json, status: :ok and return if !sample_type.save

        # return sample_type
        render json: sample_type.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "
          select st.*, stc.name as 'category' 
          from sample_types st
          inner join sample_type_categories stc on stc.id = st.sample_type_category_id
          where st.id = #{id} limit 1
        "
        results = (SampleType.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end

    end
  end
end
#
# sample_types
# - id
# - sample_type_category_id
# - name
# - description
