import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function FindUrl() {
    const location = useLocation();
    const url = location.search
    // console.log(location.search);
    console.log(url)
    const queryParams = new URLSearchParams(url)

    const uid = queryParams.get("uid")
    console.log(uid)
    
    const token = queryParams.get("token")
    console.log(token)

    const urlActivate = "https://frebi.willandskill.eu/auth/users/activate/"
    const payload = {uid, token}

    fetch(urlActivate, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${payload}`
        },
        // body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}


export default function LoginPage() {

    FindUrl()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleOnSubmit(e){
        e.preventDefault()
        console.log(email, password)
        const url="https://frebi.willandskill.eu/api-token-auth/"
        const payload = {email, password}

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            const token = data.token
            localStorage.setItem("webb21", token)
            navigate("/home")
        })
    }


    return (

        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleOnSubmit}>
                <input 
                    type="text" 
                    placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )


}


