import React, {useContext, useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { NameContext } from '../App'
import styled from 'styled-components';
import EditCustomerDetails from '../components/EditCustomerDetails';
import { useNavigate, useLocation } from 'react-router-dom'

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
//Inherit CSS-properties from other components
const CustomerData = styled(CustomerHeader)`
    font-weight: 500;
    font-size: 13pt;
    margin-bottom: 10px;
`
    const customerDataSpan = {
        fontWeight: 600,
    }

    const DeleteCustomerButton = styled.button`
    font-family: Courier;
    margin-bottom: 25px;
    border-radius: 10px;
    border: 1px solid red;
    padding: 10px;
    background: none;
    &:hover{
        color: green;
        border: 1px solid green;
    }
`

export default function CustomerDetailPage() {
    const params = useParams()
    const id = params.id
    
    //I've used customerList which is passed down from App.js (line 63) to populate the user details
    const {customerList, setCustomerList} = useContext(NameContext)
    
    const [myData, setMyData] = useState(null)


    useEffect(() => {
        fetchData()
        // const url="https://frebi.willandskill.eu/api/v1/customers/"
        // const token = localStorage.getItem("webb21")
        // fetch(url, {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        // .then(res => res.json())
        // .then(data => {
            
        //     // console.log(data)
        //     // console.log(data.results[id])
        //     // console.log(data.results[id].id)
        //     setMyData(data.results)
        // })
    }, [])

    //Fetch to Update Customer Details that's passed down to EditCustomerDetails
    function fetchData(){
        const url="https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("webb21")
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setMyData(data.results))
        // .then(data => setCustomerList(data.results))
    }

    const navigate = useNavigate()

    function handleOnDelete(id){
        
        console.log(id)
        const url=`https://frebi.willandskill.eu/api/v1/customers/${id}/`
        const token = localStorage.getItem("webb21")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "DELETE"
        })
        .then(res => fetchData())
        navigate("/home")
    }


    return (
        <div className="container">
            <div className="row">

                <div className="col-md-2">
                    <LinkParagraphContainer><Link to="/home" style={linkStyle}>Home Page</Link></LinkParagraphContainer>
                    <LinkParagraphContainer><Link to="/login" style={linkStyle}>Login Page</Link></LinkParagraphContainer>
                    <LinkParagraphContainer><Link to="/users/create" style={linkStyle}>Create a User</Link></LinkParagraphContainer>
                    
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
                            <DeleteCustomerButton onClick={e => handleOnDelete(customerList[id].id)} >Delete Customer</DeleteCustomerButton>
                        </CustomerDataContainer>
                    )}
                </div>

                <div className="col-md-5">
                    {/* Change Customer information */}
                    
                    <div>
                        <EditCustomerDetails onSuccess={fetchData} />
                    </div>

                </div>

            </div>
            
        </div>
    )
}
