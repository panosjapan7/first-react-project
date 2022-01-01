import React, {useContext, useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { NameContext } from '../App'
import styled from 'styled-components';

const LinkParagraphContainer = styled.p`
    margin-top: 20px;
`
    const linkStyle = {
        color: "red",
        textDecoration: "none",
    };

const CustomerHeader = styled.p`
    margin-top: 20px;
    margin-bottom: 40px;
    font-family: Courier;
    font-weight: 600;
    font-size: 15pt;
`

const CustomerDataContainer = styled.div`
    margin-top: 20px;
      
`

const CustomerData = styled(CustomerHeader)`
    font-weight: 500;
    font-size: 13pt;
    margin-bottom: 10px;
`
    const customerDataSpan = {
        fontWeight: 600,
    }

export default function CustomerDetailPage() {
    const params = useParams()
    const id = params.id

    const {customerList, setCustomerList} = useContext(NameContext)
    const [myData, setMyData] = useState(null)

    const [name, setName] = useState("")


    useEffect(() => {
        const url="https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("webb21")
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data)
            console.log(data.results[id])
            setMyData(data.results)
            setName(data.results[id].name)
        })
    }, [])


    function handleOnSubmit(e){
        e.preventDefault()
        const url=`https://frebi.willandskill.eu/api/v1/customers/${id}`
        const token = localStorage.getItem("webb21")

        // const body = new FormData
        // body.append("name", "\"Oskar\"")

        // fetch("https://frebi.willandskill.eu/api/v1/customers/4337/", {
        // body,
        // headers: {
        //     Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4ODgsInVzZXJuYW1lIjoid2ViYjIxQHdpbGxhbmRza2lsbC5zZSIsImV4cCI6MTY0MTU4Mjc3MCwiZW1haWwiOiJ3ZWJiMjFAd2lsbGFuZHNraWxsLnNlIiwib3JpZ19pYXQiOjE2NDA5Nzc5NzB9.I_9wpSxL3WOULlpY2rMRX3-XwVdt5bkpV5TOt7deATQ",
        //     "Content-Type": "multipart/form-data"
        // },
        // method: "PATCH"
        // })
        
        const payload = {name, id}
        fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
            
        })
        .then(res => res.json())
        .then(data => console.log(data)
        //     {
        //     setMyData(data.results)
        //     setName(data.results[id].name)
        // }
        )        
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-2">
                    <LinkParagraphContainer><Link to="/home" style={linkStyle}>Home Page</Link></LinkParagraphContainer>
                    <LinkParagraphContainer><Link to="/login" style={linkStyle}>Login Page</Link></LinkParagraphContainer>
                    
                </div>
                
                <div className="col-md-5">
                    <CustomerHeader>You are viewing the customer with id: {id}</CustomerHeader>
                    
                    {customerList && (
                        <CustomerDataContainer>
                            <CustomerData><span style={customerDataSpan}>Customer Name:</span> {customerList[id].name}</CustomerData>
                            <CustomerData><span style={customerDataSpan}>Organisation Nr:</span> {customerList[id].organisationNr}</CustomerData>
                            <CustomerData><span style={customerDataSpan}>VAT Nr:</span> {customerList[id].vatNr}</CustomerData>
                            <CustomerData><span style={customerDataSpan}>Reference:</span> {customerList[id].reference}</CustomerData>
                            <CustomerData><span style={customerDataSpan}>Payment terms:</span> NET {customerList[id].paymentTerm} days</CustomerData>
                            <CustomerData><span style={customerDataSpan}>Website:</span> {customerList[id].website}</CustomerData>
                            <CustomerData><span style={customerDataSpan}>Email:</span> {customerList[id].email}</CustomerData>
                            <CustomerData><span style={customerDataSpan}>Phone Number:</span> {customerList[id].phoneNumber}</CustomerData>
                        </CustomerDataContainer>
                    )}
                </div>

                <div className="col-md-5">
                    Change Customer information
                    
                    <div>
                        <form onSubmit={handleOnSubmit} >
                            <input 
                                value={name}
                                placeholder="Full Name"
                                onChange={e => setName(e.target.value)} 
                            />
                            {/* <input 
                                value={lastName} 
                                placeholder="Last Name"
                                onChange={e => setLastName(e.target.value)}
                            /> */}
                            <button type="submit">Update Information</button>
                        </form>

                        {myData && (
                            <>
                                <p>{name}</p>
                            </>
                        )}

                    </div>

                </div>

            </div>
            

        </div>
    )
}
