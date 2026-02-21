import {useState} from "react";
import { Link } from "react-router-dom";
import './Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(email,password)
        try{
            const res= await axios.post("http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            )
            localStorage.setItem("token",res.data.token)
            navigate("/home")
        }catch(err){
  console.log(err.response?.data); // ⭐ VERY IMPORTANT
  alert(err.response?.data?.error || err.response?.data?.message);
}
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