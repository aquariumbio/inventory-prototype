# item_states controller
module Api
  module V1
      def index
        sql = "select * from item_states order by name, id"
        results = ItemState.find_by_sql sql

        render json: results.to_json, status: :ok
      end

      def create
        item_state_params = params.require(:item_state).permit!

        # pass to model and use Input.text and Input.int to scrub parameters
        item_state = ItemState.new(item_state_params)

        # return status :ok for form errors
        render json: {errors: item_state.errors.full_messages}.to_json, status: :ok and return if !item_state.save

        # return item_state
        render json: item_state.to_json, status: :created
      end

      def show
        id = params[:id].to_i
        sql = "select * from item_states where id = #{id} limit 1"
        results = (ItemState.find_by_sql sql)[0]

        render json: results.to_json, status: :ok
      end

    end
  end
end
#
# item_states
# - id
# - item_id
# - sample_type_state_id
# - composite_sample_type_state_id
# - value
