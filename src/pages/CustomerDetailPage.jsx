import React, {useContext, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { NameContext } from '../App'

export default function CustomerDetailPage() {
    const params = useParams()
    const id = params.id

    const {customerList, setCustomerList} = useContext(NameContext)

    useEffect(() => {
        console.log(customerList)
    }, [])

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-3">
                    Left Menu
                    <p><Link to="/home">Home Page</Link></p>
                    <p><Link to="/login">Login Page</Link></p>
                    
                </div>
                
                <div className="col-md-9">
                    <p>You are viewing the customer with id: {id}</p>
                    
                    {customerList && (
                        <div>
                            <p>Customer Name: {customerList[id].name}</p>
                            <p>Organisation Nr: {customerList[id].organisationNr}</p>
                            <p>VAT Nr: {customerList[id].vatNr}</p>
                            <p>Reference: {customerList[id].reference}</p>
                            <p>Payment terms: NET{customerList[id].paymentTerm} days</p>
                            <p>Website: {customerList[id].website}</p>
                            <p>Email: {customerList[id].email}</p>
                            <p>Phone Number: {customerList[id].phoneNumber}</p>
                        </div>
                    )}
                </div>

            </div>
            

        </div>
    )
}
