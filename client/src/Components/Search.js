import React, {useState} from "react"
import LoginAuth from './LoginAuth'

function Search({addedMeds, setAddedMeds, meds, user, setUser}){
    const [search, setSearch]=useState("")
    const [filterOn, setFilterOn]=useState(false)

    const user_id = localStorage.getItem("user_id")
    const handleSearch=(e)=>{setSearch(e.target.value)}
    let displayMeds=meds.length>0? meds.filter(m=>m.generic_name.toLowerCase().includes(search.toLowerCase())):meds
    let displayAddedMeds = addedMeds
    // meds.length>0? meds.filter(m=>{(m.user_id==user_id) && (m.generic_name.toLowerCase().includes(search.toLowerCase()))}): 
    // meds.filter(m=>m.user_id==user_id)

    function filterAdded(){
        setFilterOn(!filterOn)
    }

    async function removeMed(id){
        await fetch(`https://medready.herokuapp.com/added_medications/${id}`,{
            method:"DELETE",
        })
            .then(()=>{
            const filteredAddedMeds = addedMeds.filter(med=>med.id!==id)
            setAddedMeds(filteredAddedMeds)
            })
    }

    return(
        user_id?
    <div className="search-page">
        <br/>
        <h1 className="subhead">Search Medications</h1>
        <a href="/#/add_med">Don't see your medication?</a>
        <button onClick = {filterAdded}>Filter by Medications I added</button>
        <form className="d-flex search">
            <input onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search by Generic Name" aria-label="Search"/>
            <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>
        <ul>  
            {filterOn ? displayAddedMeds.map(m=>{return(<li className="med-li" key={m.id}>Generic Name: {m.generic_name}, Brand Name: {m.brand_name}, Dosage: {m.dosage} <a href={`/#/medications/${m.id}`} className="btn btn-outline-dark">Add Prescription</a><button className="btn btn-outline-dark" onClick={()=>removeMed(m.id)}>Remove</button></li>)}):
        displayMeds.length>0?displayMeds.map((m)=>{return(<li className="med-li" key={m.id}>Generic Name: {m.generic_name}, Brand Name: {m.brand_name}, Dosage: {m.dosage} <a href={`/#/medications/${m.id}`} className="btn btn-outline-dark">Add Prescription</a></li>)}):null}
        </ul>
    </div>
    : <LoginAuth user={user} setUser={setUser}/>
    )
}
export default Search