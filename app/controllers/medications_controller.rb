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
end
