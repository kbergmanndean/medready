import React,{useState,useEffect} from "react"
import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from "./Components/Home"
import Search from "./Components/Search"
import AddDoc from "./Components/AddDoc"
import AddMed from "./Components/AddMed"
import AddPre from "./Components/AddPre"
import Doctors from "./Components/Doctors"
import Edit from "./Components/Edit"
import Auth from "./Components/Auth"
import Login from "./Components/Login"
import Navbar from "./Components/Navbar"
import LoginAuth from "./Components/LoginAuth"
import Footer from "./Components/Footer"
import UserPage from "./Components/UserPage"

function App() {

  const [meds, setMeds]=useState([])
  const [doctors, setDoctors]=useState([])
  const [prescriptions, setPrescriptions]=useState([])
  const [page, setPage]=useState("")
  const [user, setUser]=useState(null)
  const [addedMeds, setAddedMeds]=useState([])
  // const [allMeds, setAllMeds]=useState([])

  let isMounted

  useEffect(() => {
    async function fetchMedData() {
      const res = await fetch("https://medready.herokuapp.com/medications");
      // const resAdded = await fetch("https://medready.herokuapp.com/added_medications");
      const medData = await res.json();
      // const addedMedData = await resAdded.json();
      
      // setAddedMeds(addedMedData);
      setMeds(medData);
      setAddedMeds(medData.filter(m=>m.user_id))
      console.log(addedMeds)
      // setAllMeds(medData.concat(addedMedData));
    }
    async function fetchDocData() {
      const res = await fetch("https://medready.herokuapp.com/doctors");
      const docData = await res.json();
      const userDocData = docData.filter((doc)=>doc.user_id==localStorage.getItem("user_id"))
      setDoctors(userDocData)
    }
    async function fetchPreData(){
      const res=await fetch("https://medready.herokuapp.com/prescriptions")
      const preData=await res.json();
      setPrescriptions(preData)
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
        <Routes>
          <Route exact path="/signup" element= {<Auth setUser={setUser} user={user}/>}/>
          <Route exact path="/search" element={<Search addedMeds={addedMeds} setAddedMeds={setAddedMeds} meds={meds} setMeds={setMeds} user={user} setUser={setUser}/>}/>
          <Route exact path="/log_in" element= {<Login user={user} setUser={setUser}/>}/> 
          <Route exact path="/" element={<Home user={user} prescriptions={prescriptions} setPrescriptions={setPrescriptions} page={page} setPage={setPage}/>}/>
          <Route exact path="/doctors" element={<Doctors setUser={setUser} user={user} doctors={doctors} setDoctors={setDoctors}/>}/>
          <Route exact path="/add_doc" element={<AddDoc setUser={setUser} user={user} setDoctors={setDoctors} doctors={doctors}/>}/>
          <Route exact path="/add_med" element={<AddMed addedMeds={addedMeds} setAddedMeds={setAddedMeds} meds={meds} setMeds={setMeds}/>}/>
          {prescriptions? prescriptions.map(pre=>{return <Route user={user} key={pre.id} exact path={`/edit/${pre.id}`} element={<Edit doctors={doctors} pre={pre} page={page} setPage={setPage}/>}/>}):null}
          {meds? meds.map(item=>{return <Route key={item.id} exact path={`/medications/${item.id}`} element={<AddPre key={item.id} med={item} doctors={doctors} prescriptions={prescriptions} setPrescriptions={setPrescriptions}/>}/>}):null}
          <Route exact path="/login" element={<LoginAuth user={user} setUser={setUser}/>}/> 
          <Route exact path="/user" element={<UserPage setUser={setUser}/>}/>
          </Routes>
      <Footer/>
    </div>
  );
}

export default App;
