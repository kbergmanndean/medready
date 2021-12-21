import React, {useState} from "react"


function AddMed({addedMeds, setAddedMeds, meds, setMeds}){
    const [brandName, setBrandName] = useState("")
    const [genericName, setGenericName] = useState("")
    const [dosage, setDosage] = useState("")
    const [errors, setErrors] = useState([])


    const addNewMed = medAdded => {
        const newArray = [...meds, medAdded]
        setMeds(newArray);
    }

    const user_id=+localStorage.getItem("user_id")

    async function handleSubmit(e){
        e.preventDefault();
        const newMed = {user_id: user_id, brand_name: brandName, generic_name: genericName, dosage: dosage}
        const res = await fetch("https://medready.herokuapp.com/added_medications",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(newMed)
        });
        const medAdded = await res.json();
        if (res.ok){
            addNewMed(medAdded);
            console.log(medAdded)
            // routeChange();
        } else {
            setErrors(medAdded.error)
            console.log(errors)
        }
     
    }

    return(
        <div className="addmed"> 
        <div className="addmed-inner">
        <br/>
            <h1>Add Medication</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="brand-name">Brand Name</label>
                    <input type="text" className="form-control" id="brand-name" value={brandName} onChange={(e)=>setBrandName(e.target.value)}/>
                </div>
                <div className="form-group">
                <label htmlFor="medName">Generic Name</label>
                <input type="text" className="form-control" id="medName" value={genericName} onChange={(e)=>setGenericName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pill-dosage">Dosage</label>
                    <input type="text" className="form-control" id="pill-dosage" value={dosage} onChange={(e)=>setDosage(e.target.value)}/>
                </div>
                    <br/>
                    <button type="submit" className="btn btn-outline-dark form-submit">Submit</button>
            </form>
            {errors.length>=1? <ul style={{color:"red"}}>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>: null}
        </div>
        </div>
    )
}

export default AddMed