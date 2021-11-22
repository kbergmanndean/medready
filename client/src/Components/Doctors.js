import React from "react"
import LoginAuth from "./LoginAuth"

function Doctors({doctors,user, setUser, setDoctors}){

    async function removeDoc(id){
        await fetch(`https://medready.herokuapp.com/doctors/${id}`,{
            method:"DELETE",
        })
            .then(()=>{
            const filteredDocs=doctors.filter(doc=>doc.id!==id)
            setDoctors(filteredDocs)
            })
    }

    const user_id=+localStorage.getItem("user_id")

return(
    localStorage.getItem("user_id")?
    <div className="docs">
        <br/>
        <h1 className="subhead">My Doctors</h1>
        <ul>
        {doctors.length>0?doctors.map(doc=>
            doc.user_id==user_id?
            <li className="doctor-li" key={doc.id}>Name: {doc.name}, Profession: {doc.profession} <button className="btn btn-outline-dark" onClick={()=>removeDoc(doc.id)}>Remove</button></li>
            :null
            ):null}
        </ul>
        <a href="/#/search" className="btn btn-outline-dark">Search Medications</a>
    </div>
    :<LoginAuth setUser={setUser} user={user}/>
)
}
export default Doctors