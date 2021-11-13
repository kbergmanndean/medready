import { useState } from "react";
import Login from "./Login";
import Auth from "./Auth";
import bird2 from "../pictures/bird2.png"
import {useEffect} from "react"

function LoginAuth({ setUser ,user}) {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(()=>{
    console.log("page exists");
  },[])

  return (
    <div className="login">
      <div className="head">
            <hr/>
            <img src={bird2} style={{width:"100pt"}} alt="bird logo" className="bird"/>
            <h1 className="header">MedReady</h1>
            <hr/>
        </div>
      {showLogin ? (
        <>
          <Login setUser={setUser} user={user}/>
          <br/>
          <p>
            Don't have an account? &nbsp;
            <button className="btn btn-outline-dark" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <Auth setUser={setUser} />
          <br/>
          <br/>
          <p>
            Already have an account? &nbsp;
            <button className="btn btn-outline-dark" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}


export default LoginAuth;