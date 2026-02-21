import {Link} from "react-router-dom"
import { useState } from "react"
import './Register.css'

function Register(){
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword]=useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(name,email,password)
    }

    return(
        <div className="register-container">
            <form className="register-form" inSubmit={handleSubmit}>
                <h2>Register</h2>

                <input type="text" placeholder="Name" className="register-input" value={name} 
                onChange={(e)=> setName(e.target.value)} />

                <input type="email" placeholder="Email" className="register-input" value={email} 
                onChange={(e)=> setEmail(e.target.value)} />

                <input type="password" placeholder="Password" className="register-input" value={password} 
                onChange={(e)=>setPassword(e.target.value)} />

                <button className="register-button">Register</button>
                <p>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    )

}

export default Register
