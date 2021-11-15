// import {useNavigate} from "react-router-dom"
import React, {useState} from "react";

function Login({setUser,user}){
    const [username, setUserName]=useState('')
    const [password, setPassword]=useState('')
    const [errors,setErrors]=useState('')

    // const history=useNavigate();

    async function handleSubmit(e){
        e.preventDefault()
        const user={
            user_name:username,
            password:password
        }
        const res=await fetch(`medready.herokuapp.com/log_in`,{
            method:'POST',
            headers:{'Content-Type':'application/json'
            },
            body:JSON.stringify({user})
        });
        const userData= await res.json();
        if (userData.id){
            setUser(userData);
            console.log(user);
            localStorage.setItem("user_id", userData.id)
            // history.push('/')
        } else {
            setErrors(userData.errors)
            console.log(errors)
        }
    }
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <br/>
            <h1>Log In</h1>
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
            <input type="submit" value="Log In" className="btn btn-outline-dark auth"></input>
            <br/>
            <br/>
            {errors? errors.map(error=><div key={error}>{error}</div>):null}
            {user? <p className="welcome">Welcome, {user.user_name} 
            <br/>
            <br/>
             <a href="/" className="btn btn-outline-dark">Home</a></p>:null}
        </form>
        </div>
    )
}
export default Login