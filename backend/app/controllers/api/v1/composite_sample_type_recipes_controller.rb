# composite_sample_type_recipes controller
module Api
  module V1
    class CompositeSampleTypeRecipesController < ApplicationController
      def index
        sql = "select * from composite_sample_type_recipes order by name, id"
        results = CompositeSampleTypeRecipe.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        composite_sample_type_recipe_params = params.require(:composite_sample_type_recipe).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        composite_sample_type_recipe = CompositeSampleTypeRecipe.new(composite_sample_type_recipe_params)

        # return status :ok for form errors
        render json: {errors: composite_sample_type_recipe.errors.full_messages}.to_json, status: :ok and return if !composite_sample_type_recipe.save

        # return composite_sample_type_recipe
        render json: composite_sample_type_recipe.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "select * from composite_sample_type_recipes where id = #{id} limit 1"
        results = (CompositeSampleTypeRecipe.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end


    end
  end
end
#
# composite_sample_type_recipes
# - id
# - composite_sample_type_id
# - sample_type_id
