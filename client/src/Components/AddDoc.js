import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import LoginAuth from "./LoginAuth"

function AddDoc({setUser,user, setDoctors, doctors}){
    const [name, setName]=useState("")
    const [type, setType]=useState("")
    const [errors,setErrors]=useState("")

    const addNewDoc=docAdded=> {const newArray=[...doctors, docAdded]
        setDoctors(newArray)
    }

    const user_id=+localStorage.getItem("user_id")

    let history = useNavigate();
    const routeChange = () =>{ 
        let path = "/doctors"; 
        history(path);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const newDoctor={name:name, profession:type, user_id:user_id}
        const res=await fetch("https://medready.herokuapp.com/doctors",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body: JSON.stringify(newDoctor)
        })
        const doctorAdded= await res.json()
        if (res.ok){
        addNewDoc(doctorAdded);
        console.log(newDoctor)
        console.log(doctorAdded) 
        routeChange();
        }
        else {
        setErrors(doctorAdded.error)
        } 
    }


    return(
        localStorage.getItem("user_id")?
        <div className="addDoc">
            <br/>
            <h1 className="subhead">Add Doctor</h1>
            <form onSubmit={handleSubmit} className="form doctor-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <input type="text" className="form-control" id="type" onChange={(e)=>setType(e.target.value)} value={type}/>
                </div>
                <br/>
                <button type="submit" className="btn form-submit btn-outline-dark">Submit</button>
            </form>
            {errors.length>=1? <ul style={{color:"red"}}>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>: null}
        </div>
        :<LoginAuth setUser={setUser} user={user}/>
    )
}
export default AddDoc