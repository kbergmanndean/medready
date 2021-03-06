import React, {useState} from "react"
import LoginAuth from './LoginAuth'


function Search({addedMeds, setAddedMeds, meds, setMeds, user, setUser}){
    const [search, setSearch]=useState("")
    const [filterOn, setFilterOn]=useState(false)

    const user_id = localStorage.getItem("user_id")

    const handleSearch=(e)=>{setSearch(e.target.value)}

    let displayMeds = meds.length>0? meds.filter(m=>m.generic_name.toLowerCase().includes(search.toLowerCase()) && (m.user_id==user_id || !m.user_id)) : meds.filter(m=>m.user_id==user_id || !m.user_id)
    let displayAddedMeds = addedMeds.length>0? addedMeds.filter(m=>m.generic_name.toLowerCase().includes(search.toLowerCase()) && (m.user_id==user_id)) : addedMeds.filter(m=>m.user_id==user_id)

    function filterAdded(){
        setFilterOn(!filterOn)
    }

    async function removeMed(id){
        await fetch(`https://medready.herokuapp.com/medications/${id}`,{
            method:"DELETE",
        })
            .then(()=>{
            const filteredAddedMeds = addedMeds.filter(med=>med.id!==id)
            setAddedMeds(filteredAddedMeds)
            const filteredMeds = meds.filter(med=>med.id!==id)
            setMeds(filteredMeds)
            })
    }

    return(
        user_id?
    <div className="search-page">
        <br/>
        <a href="/#/search" className="subhead">Search Medications</a>
        <br/>
        <a href="/#/add_med" className="btn btn-outline-dark" >Don't see your medication?</a>
        <button className="btn btn-outline-dark filter" onClick = {filterAdded}>{!filterOn? "Filter by medications I added":"View all medications"}</button>
        <form className="d-flex search">
            <input onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search by Generic Name" aria-label="Search"/>
            <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>
        <ul>  
            {filterOn ? displayAddedMeds.map(m=>{return(
                <li className="med-li" key={`added-${m.id}`}>
                    Generic Name: {m.generic_name}, 
                    Brand Name: {m.brand_name}, 
                    Dosage: {m.dosage} 
                    <a href={`/#/medications/${m.id}`} className="btn btn-outline-dark add-button">
                        Add Prescription
                    </a>
                    <button className="btn btn-outline-dark" onClick={()=>removeMed(m.id)}>
                        Remove
                    </button>
                </li>)}):
                displayMeds.length>0 ? displayMeds.map((m)=>{return(
                <li className="med-li" key={m.id+m.generic_name}>
                    Generic Name: {m.generic_name}, 
                    Brand Name: {m.brand_name}, 
                    Dosage: {m.dosage} 
                    <a href={`/#/medications/${m.id}`} className="btn btn-outline-dark add-button">
                        Add Prescription
                    </a>
                    {m.user_id ? 
                    <button className="btn btn-outline-dark" onClick={()=>removeMed(m.id)}>
                        Remove
                    </button> : null}
                </li>)}):
                null}
        </ul>
    </div>
    : <LoginAuth user={user} setUser={setUser}/>
    )
}
export default Search