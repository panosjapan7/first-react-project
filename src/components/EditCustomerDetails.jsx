import React, {useState} from 'react'
import { useEffect } from 'react/cjs/react.development'
import { useParams } from 'react-router-dom'
import styled from "styled-components"

const SubmitButton = styled.button`
        font-family: Courier;
        margin-top: 20px;
        border-radius: 10px;
        border: 1px solid red;
        padding: 10px;
        background: none;
        &:hover{
            color: green;
            border: 1px solid green;
        }
`
const Header2 = styled.h2`
        font-family: Courier;
        margin-top: 20px;
`
const constFormInputNew = {
    fontFamily: "Courier",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid red",
    padding: "5px",
    width: "300px",
}

const vatNrInput = {
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid red",
    padding: "5px",
    width: "300px",
}

const EditCustomerContainer = {
    marginTop: "20px",
    marginLeft: "50px",
}

export default function EditCustomerDetails(props) { 

    let params = useParams()

    const [name, setName] = useState("")
    const [organisationNr, setOrganisationNr] = useState("")
    const [vatNr, setVatNr] = useState("")
    const [reference, setReference] = useState("")
    const [paymentTerm, setPaymentTerm] = useState("")
    const [website, setWebsite] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [customer, setCustomer] = useState(null)
    const [customerId, setCustomerId] = useState("")

    function renderInput(type, placeholder, value, setValue){
        return <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
            style={constFormInputNew}
        />
    }

    
    useEffect(() => {
        const url=`https://frebi.willandskill.eu/api/v1/customers/${params.id}`
        const token = localStorage.getItem("webb21")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => 
            {
                setCustomer(data.results[params.id])

                setCustomerId(data.results[params.id].id)
                
                setName(data.results[params.id].name)
                
                setOrganisationNr(data.results[params.id].organisationNr)
                setVatNr(data.results[params.id].vatNr)
                setReference(data.results[params.id].reference)
                setPaymentTerm(data.results[params.id].paymentTerm)
                setWebsite(data.results[params.id].website)
                setEmail(data.results[params.id].email)
                setPhoneNumber(data.results[params.id].phoneNumber)
            })
        // .then(data => console.log(customer))
        
    },[])


    function handleOnSubmit(e){
        e.preventDefault()
        //I had a problem figuring out the solution to editing customer details, so I console-logged everything
        //In the end, I discovered that instead of the customer id, I was using the value in URL (0 for first customer in the array, 1 for next customer etc. )
        console.log(customerId)
        console.log(name)
        console.log(organisationNr)
        console.log(vatNr)
        console.log(reference)
        console.log(paymentTerm)
        console.log(website)
        console.log(email)
        console.log(phoneNumber)

        const url=`https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        
        const token = localStorage.getItem("webb21")
        const payload = {name, organisationNr, vatNr, reference, paymentTerm, website, email, phoneNumber}

        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => props.onSuccess())
        
    }

    //For Debugging purposes
    function test(){
        console.log(params.id)
        console.log(customer)
        console.log(name)
        console.log(organisationNr)
        console.log(vatNr)
        console.log(reference)
        console.log(paymentTerm)
        console.log(website)
        console.log(email)
        console.log(phoneNumber)
    }


    return (
        <div>
            
            <Header2>Edit Customer Details</Header2>
            {/* For Debugging purposes */}
            {/* <button onClick={test} >Console.log</button> */}

            <form onSubmit={handleOnSubmit} >
                {renderInput("text", "Name", name, setName)}
                <br />
                {renderInput("text", "Org. Nr.", organisationNr, setOrganisationNr)}
                <br />

                <input
                    type="text"
                    placeholder="VAT nr. (SE10-digits)"
                    value={vatNr}
                    onChange={e => setVatNr(e.target.value)}
                    pattern="SE[0-9]{10}"
                    style={constFormInputNew}
                />
                <br />
                {renderInput("text", "Reference", reference, setReference)}
                <br />
                {renderInput("number", "Payment Terms", paymentTerm, setPaymentTerm)}
                <br />
                {renderInput("text", "Website", website, setWebsite)}
                <br />
                {renderInput("text", "Email", email, setEmail)}
                <br />
                {renderInput("text", "Phone Number", phoneNumber, setPhoneNumber)}
                <br />
                <SubmitButton type="submit">Update Customer Details</SubmitButton>
            </form>
        </div>
    )
}
