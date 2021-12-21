import React from "react"

function AddMed({user, setUser, meds, setMeds}){

    const addNewMed = medAdded => {
        const newArray = [...meds, medAdded]
        setMeds(newArray);
    }

    const user_id=+localStorage.getItem("user_id")

    async function handleSubmit(e){
        e.preventDefault();
     
    }

    return(
        <p>Add Med</p>
    )
}

export default AddMed