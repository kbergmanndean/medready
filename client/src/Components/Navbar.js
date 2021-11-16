import React from "react"
import {useNavigate} from 'react-router-dom'

function Navbar({user, setUser}){

    const navigate=useNavigate();

    function handleLogout(){
        async function logout(){
            const res=await fetch("https://medready.herokuapp.com/logout",{
                method:"DELETE"})
                if (res.ok){
                    setUser(null);
                    localStorage.clear();
                    
                };
        };logout();
        navigate('login');
    };

    const user_id=localStorage.getItem("user_id")

    function handleDelete(){
        async function destroy(){
            const res=await fetch(`https://medready.herokuapp.com/users/${user_id}`,{
                method:"DELETE"
            })
                
        };destroy();
        handleLogout();
        
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">MedReady</a>
            {localStorage.getItem("user_id")?<span className="user">User #{user_id}</span>:null}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#/add_doc">Add a Doctor</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#/doctors">My Doctors</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#/search">Search Medications</a>
                    </li>
                    
                    {localStorage.getItem("user_id")?
                        <div>
                            <li className="nav-item">
                                <button className="btn btn-outline-dark logout" onClick={handleLogout}>Log Out</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-dark delete-account" onClick={handleDelete}>Delete Account</button>
                            </li>
                        </div>
                    :
                    <li className="nav-item">
                    <a className="nav-link" href="/#/login">Login</a>
                    </li>}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar