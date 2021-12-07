import bottle from "../pictures/bottle4.png"
import React from "react"
import Alert from "./Alert.js"
function MyPre({pre, prescriptions, setPrescriptions}){
   
    //format date from yyyy/mm/dd to mm/dd/yyyy
    function formatDate(inputDate){
        let initialDate= new Date(inputDate)
        let date=new Date(initialDate.getTime()-initialDate.getTimezoneOffset()*-60000);
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

    Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date
    }

    let initialDate = new Date(pre.date_given)
    let date = new Date(initialDate.getTime()-initialDate.getTimezoneOffset()*-60000);
    let count = (pre.doses_in_container)/(pre.daily_dosage)
    let today = new Date(new Date().toDateString());
    let refillDate = new Date(date.addDays(count))
    let weekNotice = new Date(new Date().toDateString());
    weekNotice.setDate(refillDate.getDate()-7)

    if (+refillDate <= +today){
       return <Alert/>
        // alert(`Time to refill ${pre.medication.generic_name}!`)
        // } else if (+weekNotice == +today){
        // alert(`In one week, you will be out of ${pre.medication.generic_name}!`)
        
    }

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