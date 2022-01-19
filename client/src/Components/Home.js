import MyPre from "./MyPre"
import bird2 from "../pictures/bird2.png"
import React from "react"

function Home({prescriptions, setPrescriptions}){

    return(
    <div className="home">
        <div className="head">
            <hr/>
            <img src={bird2} style={{width:"100pt"}} alt="bird logo" className="bird"/>
            <h1 className="header">MedReady</h1>
            <hr/>
        </div>
        
        {localStorage.getItem("user_id") && prescriptions? <div className="card-holder row row-cols-1 row-cols-md-3">
            <h1 className="subhead">My Prescriptions</h1>
            {prescriptions.map((pre)=>{return <MyPre key={pre.id} pre={pre} prescriptions={prescriptions} setPrescriptions={setPrescriptions}/>})}</div>
        : <><h2 className="center">Log in to see your prescriptions.</h2><br/><br/><br/><br/><br/><br/><br/><br/></>}
    </div>
    )}
export default Home