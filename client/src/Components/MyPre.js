import bottle from "../pictures/bottle4.png"
import React from "react"

function MyPre({pre, prescriptions, setPrescriptions}){
   
    function formatDate(inputDate){
        let date= new Date(inputDate)
        let month=''+(date.getMonth()+1);
        let day=''+(date.getDate());
        let year=date.getFullYear();

        if (month.length<2){
            month='0'+month;
        }
        if (day.length<2){
            day='0'+day;
        }
        return [month,day,year].join('/')
    }
    let formattedDate=formatDate(pre.date_given)

    async function handleDelete(id){
        await fetch(`https://medready.herokuapp.com/prescriptions/${id}`,{
                method:"DELETE",
            })
                .then(()=>{
                const filteredPrescriptions=prescriptions.filter(pre=>pre.id!==id)
                setPrescriptions(filteredPrescriptions)
                })
    }
    const user_id=+localStorage.getItem("user_id")

    return(
        
        <div className="card" style={{width: "18rem"}}>
            {pre.user_id===user_id?
            <>
            <img src={bottle} className="card-img-top bottle" alt="..."/>
            <div className="card-body">
                <p className="card-text">
                Generic Name: {pre.medication.generic_name} 
                <br/>Brand Name: {pre.medication.brand_name} 
                <br/>Strength: {pre.medication.dosage} 
                <br/>Daily Dosage: {pre.daily_dosage}
                <br/>Doses in Container:{pre.doses_in_container}
                <br/>Directions: {pre.directions}
                <br/>Prescribing Doctor: {pre.doctor.name}, {pre.doctor.profession}
                <br/>Date Filled: {formattedDate}
                </p>
                <a className="btn btn-outline-dark" href={`/#/edit/${pre.id}`}>Edit</a> <button className="btn btn-outline-dark" onClick={()=>{handleDelete(pre.id)}}>Remove</button>
            </div> 
            </>
            : null}
        </div>
        
        
        
    )
}
export default MyPre