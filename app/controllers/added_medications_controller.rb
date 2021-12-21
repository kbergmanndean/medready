class AddedMedicationsController < ApplicationController
    skip_before_action :authorize

    def index
        added_meds=AddedMedication.all
        render json: added_meds
    end

    def show
        added_med=AddedMedication.find_by(id:params[:id])
        render json: added_med
    end

    def create
        new_added_med=AddedMedication.create(added_med_params)
        if new_added_med.valid?
            render json:new_added_med
        else
            render json: {error:new_added_med.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private
    
    def added_med_params
        params.require(:added_medication).permit(:generic_name, :brand_name, :dosage, :user_id)
    end
end
