class DoctorsController < ApplicationController
    skip_before_action :authorize
    def index
        doctors=Doctor.all
        render json: doctors
    end

    def show
        doctor=Doctor.find_by(id:params[:id])
        render json: doctor
    end

    def create
        new_doctor=Doctor.create(doctor_params)
        if new_doctor.valid?
            render json: new_doctor, status: :created
        else
            render json: {error:new_doctor.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        delete_doc=Doctor.find_by(id:params[:id])
        delete_doc.destroy
        head:no_content
    end

    private

    def doctor_params
        params.permit(:name, :profession, :user_id)
    end


end
