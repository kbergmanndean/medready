import React, {useState} from "react"
import LoginAuth from './LoginAuth'

function Search({setMed, meds, user, setUser}){
    const [search, setSearch]=useState("")

    const handleSearch=(e)=>{setSearch(e.target.value)}
    const displayMeds=meds.length>0? meds.filter(m=>m.generic_name.toLowerCase().includes(search.toLowerCase())):meds

   

    return(
        localStorage.getItem("user_id")?
    <div className="search-page">
        <br/>
        <h1 className="subhead">Search Medications</h1>
        <form className="d-flex search">
            <input onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search by Generic Name" aria-label="Search"/>
            <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>
        <ul>
        {displayMeds.length>0?displayMeds.map((m)=>{return(<li className="med-li" key={m.id}>Generic Name: {m.generic_name}, Brand Name: {m.brand_name}, Dosage: {m.dosage} <a onClick={()=>setMed(m)} href={`/#/medications/${m.id}`} className="btn btn-outline-dark">Add Prescription</a></li>)}):null}
        </ul>
    </div>
    : <LoginAuth user={user} setUser={setUser}/>
    )
}
export default Search