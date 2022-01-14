class MedicationsController < ApplicationController
    skip_before_action :authorize

    def index
        meds=Medication.all
        render json: meds
    end

    def show
        med=Medication.find_by(id:params[:id])
        render json: med
    end

    def create
        new_med=Medication.create(med_params)
        if new_med.valid?
            render json:new_med
        else
            render json: {error:new_med.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private
    
    def med_params
        params.require(:medication).permit(:generic_name, :brand_name, :dosage, :user_id)
    end


end
