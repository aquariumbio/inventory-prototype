# composite_composite_sample_type_states controller
module Api
  module V1
    class CompositeSampleTypeStatesController < ApplicationController
      def index
        sql = "select * from composite_sample_type_states order by name, id"
        results = CompositeSampleTypeState.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        composite_sample_type_state_params = params.require(:composite_sample_type_state).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        composite_sample_type_state = CompositeSampleTypeState.new(composite_sample_type_state_params)

        # return status :ok for form errors
        render json: {errors: composite_sample_type_state.errors.full_messages}.to_json, status: :ok and return if !composite_sample_type_state.save

        # return composite_sample_type_state
        render json: composite_sample_type_state.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "select * from composite_sample_type_states where id = #{id} limit 1"
        results = (CompositeSampleTypeState.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end

    end
  end
end
#
# composite_composite_sample_type_states
# - id
# - composite_composite_sample_type_id
# - state
# - state_type
