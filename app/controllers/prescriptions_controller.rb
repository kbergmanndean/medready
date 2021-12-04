class PrescriptionsController < ApplicationController
    skip_before_action :authorize

    def index
        # scripts=Prescription.find_by(user_id:params[:user_id])
        scripts=Prescription.all
        render json:scripts, include: [:doctor, :medication]
    end

    def show
        script=Prescription.find_by(id:params[:id])
        render json: script, include: [:doctor, :medication]
    end

    def create
        new_script=Prescription.create!(script_params)
        if new_script.valid?
            render json:new_script, include: [:medication, :doctor], status: :created
        else
            render json:{error:new_script.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        script_update=Prescription.find_by(id:params[:id])
        script_update.update(script_params)
        if script_update.valid?
            render json: script_update, include: [:doctor, :medication]
        else
            render json:{error:script_update.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        script_destroy=Prescription.find_by(id:params[:id])
        script_destroy.destroy 
        head:no_content
    end

    private
    def script_params
        params.require(:prescription).permit(:user_id, :medication_id, :doctor_id, :daily_dosage, :directions, :doses_in_container, :date.strftime("%Y-%m-%d"))
    end
end
