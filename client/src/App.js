import React from "react"
import ReactDOM from 'react-dom'
import './App.css';
import {HashRouter as Router,Routes,Route, useNavigate} from "react-router-dom"
import Home from "./Components/Home"
import Search from "./Components/Search"
import AddDoc from "./Components/AddDoc"
import AddPre from "./Components/AddPre"
import {useState, useEffect} from "react"
import Doctors from "./Components/Doctors"
import Edit from "./Components/Edit"
import Auth from "./Components/Auth"
import Login from "./Components/Login"
import Navbar from "./Components/Navbar"
import LoginAuth from "./Components/LoginAuth"
import Footer from "./Components/Footer"

function App() {

const [med,setMed]=useState("")
const [meds, setMeds]=useState([])
const [doctors, setDoctors]=useState([])
const [prescriptions, setPrescriptions]=useState([])
const [page, setPage]=useState("")
const [user, setUser]=useState(null)

let isMounted

useEffect(() => {
  async function fetchMedData() {
    const res = await fetch("http://localhost:3000/medications");
    const medData = await res.json();
    setMeds(medData);
  }
  async function fetchDocData() {
    const res = await fetch("http://localhost:3000/doctors");
    const docData = await res.json();
    setDoctors(docData);
  }
  async function fetchPreData(){
    const res=await fetch("http://localhost:3000/prescriptions")
    const preData=await res.json()
    setPrescriptions(preData)
    console.log(preData)
  }
  if (localStorage.getItem("user_id")){
  fetchDocData();
  fetchMedData();
  fetchPreData();
 
  } else {
    console.log("please log in")
  }
}, []);
  
  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      <Router>
        <Routes>
          {/* {localStorage.getItem("user_id")?
          <> */}
          <Route exact path="/signup" element= {<Auth setUser={setUser} user={user}/>}/>
          <Route exact path="/search" element={<Search meds={meds} setMed={setMed} user={user} setUser={setUser}/>}/>
          <Route exact path="/log_in" element= {<Login user={user} setUser={setUser}/>}/> 
          <Route exact path="/" element={<Home user={user} prescriptions={prescriptions} setPrescriptions={setPrescriptions} page={page} setPage={setPage}/>}/>
          <Route exact path="/doctors" element={<Doctors setUser={setUser} user={user} doctors={doctors} setDoctors={setDoctors}/>}/>
          <Route exact path="/add_doc" element={<AddDoc setUser={setUser} user={user} setDoctors={setDoctors} doctors={doctors}/>}/>
          {prescriptions? prescriptions.map(pre=>{return <Route user={user} key={pre.id} exact path={`/edit/${pre.id}`} element={()=><Edit doctors={doctors} pre={pre} page={page} setPage={setPage}/>}/>}):null}
          {meds? meds.map(item=>{return <Route user={user} key={item.id} exact path={`/medications/${item.id}`} element={()=><AddPre key={item.id} med={item} setMed={setMed} doctors={doctors} prescriptions={prescriptions} setPrescriptions={setPrescriptions} isMounted={isMounted}/>}/>}):null}
          {/* </>: */}
          <Route exact path="/login" element={<LoginAuth user={user} setUser={setUser}/>}/> 
          {/* }  */}
          </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
