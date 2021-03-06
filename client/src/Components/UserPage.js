import React from 'react'
import {useNavigate} from 'react-router-dom'
import bird from "../pictures/bird2.png"

function UserPage({setUser}){

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
    const username=localStorage.getItem("username")

    function handleDelete(){
        async function destroy(){
            await fetch(`https://medready.herokuapp.com/users/${user_id}`,{
                method:"DELETE"
            })
                
        };destroy();
        handleLogout();
    };

    return(
        <div className="user-page">
           <div className="head">
            <hr/>
            <img src={bird} style={{width:"100pt"}} alt="bird logo" className="bird"/>
            <h1 className="header">{username}</h1>
            <hr/>
        </div>
            <button className="btn btn-outline-dark logout" onClick={handleLogout}>Log Out</button>
            <button className="btn btn-outline-dark delete-account" onClick={handleDelete}>Delete Account</button>
        </div>
    )
}

export default UserPage