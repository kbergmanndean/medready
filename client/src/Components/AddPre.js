import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

function AddPre({med, doctors, prescriptions, setPrescriptions}){
    const [preDoc, setPreDoc] = useState(0)
    const [dose, setDose] = useState("")
    const [direct, setDirect] = useState("")
    const [cont, setCont] = useState("")
    const [errors, setErrors] = useState([])
    const [date, setDate] = useState("")

    let history = useNavigate();
    const routeChange = () =>{ 
        let path = "/"; 
        history(path);
    }

    const addNewPre=(pre)=> {const newArray =[...prescriptions,pre]
    setPrescriptions(newArray)}

    const user_id=+localStorage.getItem("user_id")
    

    async function handleSubmit(e){
        e.preventDefault();
        const newPre={user_id:user_id,medication_id: med.id, doctor_id:preDoc, daily_dosage:dose, directions:direct, doses_in_container:cont, date:date }
        const res=await fetch("https://medready.herokuapp.com/prescriptions",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(newPre)
        })
        const preAdded= await res.json()
        
        if (res.ok){
        console.log(preAdded)
        addNewPre(preAdded);
        routeChange();
        } 
        setErrors(preAdded.error) 
        console.log(errors)
    }
    

    return(
        <div className="addpre"> 
        <div className="addpre-inner">
        <br/>
            <h1>Add Prescription</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="med">Generic Name</label>
                <select type="text" className="form-control" id="med">
                    <option value={med.id}>{med.generic_name}</option>
                </select>
                </div>
                <div className="form-group">
                <label htmlFor="doc">Prescribing Doctor</label>
                <select type="text" className="form-control" id="doc" onChange={(e)=>setPreDoc(parseInt(e.target.value))}>
                    <option value="">Select Doctor</option>
                    {doctors.map(doc=>{return<option key={doc.id} value={doc.id}>{doc.name}, {doc.profession}</option>})}
                </select>
                </div>
                <div className="form-group">
                    <label htmlFor="dosage">Prescribed Daily Dosage</label>
                    <input type="text" className="form-control" id="dosage" value={dose} onChange={(e)=>setDose(parseFloat(e.target.value))}/>
                </div>
                <div className="form-group">
                    <label htmlFor="directions">Directions</label>
                    <input type="text" className="form-control" id="directions" value={direct} onChange={(e)=>setDirect(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="number-doses">Doses in Container</label>
                    <input type="text" className="form-control" id="number-doses" value={cont} onChange={(e)=>setCont(parseInt(e.target.value))}/>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date prescribed</label>
                    <input type="text" className="form-control" id="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
                </div>
                    <br/>
                    <button type="submit" className="btn btn-outline-dark form-submit">Submit</button>
            </form>
            {errors.length>=1? <ul style={{color:"red"}}>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>: null}
        </div>
        </div>
    )
}
export default AddPre