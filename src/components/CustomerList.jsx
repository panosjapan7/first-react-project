import React, {useState, useEffect, useContext} from 'react'
import CustomerCreate from './CustomerCreate'
import {Link} from "react-router-dom"
import { NameContext } from '../App'


export default function CustomerList() {

    const [customerList, setCustomerList] = useState(null)
    // const {customerList} = useContext(NameContext)

    useEffect(() => {
        fetchData()
        console.log(customerList)
    }, [])

    function fetchData(){
        const url="https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("webb21")
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setCustomerList(data.results))
    }

    function clgList(e){
        console.log(customerList)
    }

    return (
        <div className="container">
            Customer List Component
            <div className="row">

                <div className="col-md-5">
                <CustomerCreate onSuccess={fetchData} />
                </div>
                
                <div className="col-md-7">
                    <button onClick={fetchData}>Refresh</button>
            
                    {customerList && customerList.map((item, index) => {
                        return <p key={index}>
                                    <Link to={`/customers/${index}`} >{item.name}</Link>
                            </p>
                    })}
                </div>

            </div>
            
            
            
        </div>
    )
}
