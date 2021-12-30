import bottle from "../pictures/bottle4.png"
import React, {useState} from "react"
import Alert from "./Alert.js"

function MyPre({pre, prescriptions, setPrescriptions}){
   const [alert, setAlert] = useState(true)

   //function for pressing ok button on alert
    function onOkay(){
        setAlert(false)
    }

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

    //function creating method addDays which will add count to date_given to find refill date
    Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date
    }

    //create Date of initial date_given of prescription
    let initialDate = new Date(pre.date_given)
    //format initial date to account for timezones
    let date = new Date(initialDate.getTime()-initialDate.getTimezoneOffset()*-60000);
    //create variable count for doses in container divided by daily dosage to calculate how many days until refill
    let count = (pre.doses_in_container)/(pre.daily_dosage)
    //create Date for today's date
    let today = new Date(new Date().toDateString());
    //create date for days meds run out using addDays method and count variable
    let refillDate = new Date(date.addDays(count))
    //create variable for days left of meds, using refill date minus today
   function adjustTimeZone(date){
       let result=new Date (date);
       result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
       return result;
   }
   function daysBetween(start,end){
       let msPerDay = 24 * 60 * 60 * 1000;
       return (adjustTimeZone(end) - adjustTimeZone(start)) / msPerDay;
   }
   let daysLeft = daysBetween(today, refillDate)
    
    

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
        pre.user_id===user_id?
        (daysLeft <= 7 && alert == true)?
            <Alert daysLeft={daysLeft} pre={pre} onOkay={onOkay}/>    
        : 
        <div className="card" style={{width: "18rem"}}>
            <img src={bottle} className="card-img-top bottle" alt="..."/>
            <div className="card-body">
                <p className="card-text">
                    <span className="info">Generic Name: </span>
                    {pre.medication.generic_name} 
                    <br/>
                    <span className="info">Brand Name: </span>
                    {pre.medication.brand_name} 
                <br/>Strength: {pre.medication.dosage} 
                <br/>Daily Dosage: {pre.daily_dosage}
                <br/>Doses in Container:{pre.doses_in_container}
                <br/>Directions: {pre.directions}
                <br/>Prescribing Doctor: {pre.doctor.name}, {pre.doctor.profession}
                <br/>Date Filled: {formattedDate}
                </p>
                <a className="btn btn-outline-dark" href={`/#/edit/${pre.id}`}>Edit</a> <button className="btn btn-outline-dark" onClick={()=>{handleDelete(pre.id)}}>Remove</button>
            </div> 
        </div>
        : null  
    )
}
export default MyPre