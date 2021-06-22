# composite_composite_sample_types controller
module Api
  module V1
    class CompositeSampleTypesController < ApplicationController
      def index
        sql = "select * from composite_sample_types order by name, id"
        results = CompositeSampleType.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        composite_sample_type_params = params.require(:composite_sample_type).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        composite_sample_type = CompositeSampleType.new(composite_sample_type_params)

        # return status :ok for form errors
        render json: {errors: composite_sample_type.errors.full_messages}.to_json, status: :ok and return if !composite_sample_type.save


        # save the sample type ids
        composite_sample_type.save_sample_type_ids if composite_sample_type.composite_sample_class == "fixed"
        
        # return composite_sample_type
        render json: composite_sample_type.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "select * from composite_sample_types where id = #{id} limit 1"
        results = (CompositeSampleType.find_by_sql sql)[0]
        
        if results and results.composite_sample_class == 'fixed'
          sql = "
            select cstr.*, st.name 
            from composite_sample_type_recipes cstr
            inner join sample_types st on st.id = cstr.sample_type_id
            where cstr.composite_sample_type_id = #{id}
            order by cstr.id
          "
          recipes = CompositeSampleTypeRecipe.find_by_sql sql
        else
          recipes = []
        end

        render json: { results: results, recipes: recipes }.to_json, status: :ok
      end

    end
  end
end
#
# composite_composite_sample_types
# - id
# - composite_sample_class =  fixed, variable
# - name
# - description

