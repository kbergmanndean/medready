import React, {useState} from "react"
// import {useHistory} from "react-router-dom"

function Edit({doctors,pre}){

    // const history = useHistory();

    const [dosage, setDosage] = useState(pre.daily_dosage)
    const [directions, setDirections] = useState (pre.directions)
    const [doses, setDoses] = useState(pre.doses_in_container)
    const [currentMedId, setCurrentMedId] = useState(pre.medication.id)
    const [currentDocId, setCurrentDocId] = useState(pre.doctor.id)
    const [errors, setErrors]=useState([])

    // const routeChange = () =>{ 
    //     let path = `/`; 
    //     history.push(path);}

    async function handleSubmit(e){
        e.preventDefault();
        const editedPre={medication_id:currentMedId, doctor_id:currentDocId, daily_dosage:dosage, directions:directions, doses_in_container:doses}
        const res=await fetch (`https://medready.herokuapp.com/prescriptions/${pre.id}`,{
            method: 'PATCH',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(editedPre)
        })
        const edited=await res.json()
        if (res.ok){
            setDosage("")
            setDirections("")
            setDoses("")
            alert("form submitted")
            setErrors([])
            // routeChange();
        }else{
            setErrors(edited.error)
            console.log(edited)
        }
    }

    return(
        <div className="edit"> 
        <br/>
        <br/>
            <h1>Edit Prescription</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="med">Generic Name</label>
                <select type="text" className="form-control" id="med" onChange={(e)=>setCurrentMedId(e.target.value)}>
                    <option value={currentMedId}>{pre.medication.generic_name}</option>
                </select>
                </div>
                <div className="form-group">
                <label htmlFor="doc">Prescribing Doctor</label>
                <select type="text" className="form-control" id="doc" onChange={(e)=>setCurrentDocId(e.target.value)}>
                    <option value={currentDocId}>{pre.doctor.name} (Current Doctor)</option>
                    {doctors.map(doc=><option key={doc.id} value={doc.id}>{doc.name}, {doc.profession}</option>)}
                </select>
                </div> 
                <div className="form-group">
                    <label htmlFor="dosage">Prescribed Daily Dosage</label>
                    <input type="text" className="form-control" id="dosage" onChange={(e)=>setDosage(e.target.value)} value={dosage}/>
                </div>
                <div className="form-group">
                    <label htmlFor="directions">Directions</label>
                    <input type="text" className="form-control" id="directions" onChange={(e)=>setDirections(e.target.value)} value={directions}/>
                </div>
                <div className="form-group">
                    <label htmlFor="number-doses">Doses in Container</label>
                    <input type="text" className="form-control" id="number-doses" onChange={(e)=>setDoses(e.target.value)} value={doses}/>
                </div>
                    <br/>
                    <button type="submit" className="btn btn-outline-dark form-submit">Submit</button>
                    <br/>
                    <br/>
                    <a className="btn btn-outline-dark" href="/">Home</a>
            </form>
            {errors.length>0? <ul style={{color:"red"}}>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>: null}
        </div>

    )
}
export default Edit