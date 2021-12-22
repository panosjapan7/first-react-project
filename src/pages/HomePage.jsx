import React, {createContext, useContext, useEffect, useState} from 'react'
import { NameContext } from '../App'
import CustomerList from '../components/CustomerList'
import { Link } from 'react-router-dom'

export default function HomePage() {

    const [myData, setMyData] = useState(null)

    useEffect(() => {

        const url="https://frebi.willandskill.eu/api/v1/me"
        
        const token = localStorage.getItem("webb21")

        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setMyData(data))

    }, [])

    const {name, setName} = useContext(NameContext)
    return (
        <div className="container">
            <div className="row">

                <div className="col-md-3">
                    {myData && (
                    <div>
                        <h5>Hello, {myData. firstName} {myData.lastName}</h5>
                        <p>Your email address is {myData.email} </p>
                        <p><Link to="/login">Login Page</Link></p>
                    </div>
                    )}

                    <div>
                        {/* <Link></Link> */}
                    </div>
                </div>

                <div className="col-md-9">
                    <CustomerList />
                </div>

            </div>
            {/* <h1>Start Page, {name}</h1>
            <input 
                placeholder="Your name" 
                value={name}
                onChange={e => setName(e.target.value)}
            /> */}
            
            
            
          

        </div>
    )
}
