# sample_type_states controller
module Api
  module V1
    class SampleTypeStatesController < ApplicationController
      def index
        sql = "select * from sample_type_states order by name, id"
        results = SampleTypeState.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        sample_type_state_params = params.require(:sample_type_state).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        sample_type_state = SampleTypeState.new(sample_type_state_params)

        # return status :ok for form errors
        render json: {errors: sample_type_state.errors.full_messages}.to_json, status: :ok and return if !sample_type_state.save

        # return sample_type_state
        render json: sample_type_state.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "select * from sample_type_states where id = #{id} limit 1"
        results = (SampleTypeState.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end

    end
  end
end
#
# sample_type_states
# - id
# - sample_type_id
# - state
# - state_type
