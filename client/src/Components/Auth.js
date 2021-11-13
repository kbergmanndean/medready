import {useNavigate} from "react-router-dom"
import React, {useState} from "react";

function Auth({user,setUser}){
    const [username, setUserName]=useState('')
    const [password, setPassword]=useState('')
    const [errors,setErrors]=useState([])

    const history=useNavigate();

    async function handleSubmit(e){
        e.preventDefault()
        const user={
            user_name: username,
            password: password
        }
        const res=await fetch(`http://localhost:3000/users`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({user})
        }); const userData=await res.json();
        if(userData.id){
            setUser(userData)
            console.log(userData)
            localStorage.setItem("user_id", userData.id)
            // history.push("/");
        } else {
            console.log(userData.error)
            setErrors(userData.error)
            console.log("errors:", errors)
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <br/>
            <h1>Sign Up</h1>
            <br/>
            <input
                type="text" 
                placeholder="username"
                value={username}
                name="username"
                onChange={(e)=>setUserName(e.target.value)}>
            </input>
            <input
                type="text"
                placeholder="password"
                value={password}
                name="password"
                onChange={(e)=>setPassword(e.target.value)}>
            </input>
            <input className="btn btn-outline-dark auth" type="submit" value="Sign Up"></input>
            {errors.length>0?errors.map(error=><div>{error}</div>):null}
            {user?<p>Welcome,{user.user_name}</p>:null}
        </form>
        </>
    )
}
export default Auth