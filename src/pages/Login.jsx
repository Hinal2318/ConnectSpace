import {useState} from "react";
import { Link } from "react-router-dom";
import './Login.css'

function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email,password)
    }
    return(
        <div className="login-container">
            <form action="" onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input type="email" placeholder="email" name="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                 <input type="password" placeholder="password" name="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>

                <button className="login-button"> Login</button>
                <p>Do you have an account? <Link to="/register">Register</Link></p>
            </form>

        </div>
    )
}

export default Login;