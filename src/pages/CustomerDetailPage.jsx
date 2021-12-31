import React, {useContext, useEffect} from 'react'
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

    useEffect(() => {
        console.log(customerList)
    }, [])

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-3">
                    <LinkParagraphContainer><Link to="/home" style={linkStyle}>Home Page</Link></LinkParagraphContainer>
                    <LinkParagraphContainer><Link to="/login" style={linkStyle}>Login Page</Link></LinkParagraphContainer>
                    
                </div>
                
                <div className="col-md-9">
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

            </div>
            

        </div>
    )
}
