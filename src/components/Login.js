import React from 'react'
import {Button} from "@material-ui/core"
import "./Login.css"
import {auth,provider} from '../firebase'


function Login() {

    // const [{}, dispatch]= useStateValue();

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            //console.log(result.user);
            window.location.href="/";
        })
        .catch((err)=>alert(err.message));
        
    };
    return (
        <div className="login">
            <div className="container__box">
            <h1 className="brand__name">WeConnect</h1>
            <h1 className="tagline">Think Less, Chat More.</h1>
            <hr 
                style={{
                    color: "white",
                    width: "55px",
                    marginBottom: "80px"
                }}
            />
            <Button type="submit" className="login__button" onClick={signIn}> Sign In using Google </Button>
            

            </div>
        </div>
    )
}

export default Login
