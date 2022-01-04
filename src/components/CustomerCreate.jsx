import React, {useState} from 'react'
import styled from "styled-components"

export default function CustomerCreate(props) {

    const [name, setName] = useState("")
    const [organisationNr, setOrganisationNr] = useState("")
    const [vatNr, setVatNr] = useState("")
    const [reference, setReference] = useState("")
    const [paymentTerm, setPaymentTerm] = useState("")
    const [website, setWebsite] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    //Inputs lose focus after typing just one character in the input field if I make the container div -> CustomerCreateContainer
    const CustomerCreateContainer = styled.div`
        margin-left: 50px;
        margin-top: 20px;
    `
    const CustomerCreateContainerNew = {
        marginTop: "20px",
        marginLeft: "50px",
    }

    const Header2 = styled.h2`
        font-family: Courier;
    `
    
    //Input loses focus after typing just one character in the input field, so I used constFormInputNew to style the inputs
    // const FormInput = styled.input`
    //     font-family: Courier;
    //     margin-top: 10px;
    //     border-radius: 10px;
    //     border: 1px solid red;
    //     padding: 5px;
    //     width: 300px;
    // `
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

    function renderInput(type, placeholder, value, setValue){
        return <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
            style={constFormInputNew}
        />
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        const url="https://frebi.willandskill.eu/api/v1/customers/"
        const payload = {name, organisationNr, vatNr, reference, paymentTerm, website, email, phoneNumber}
        const token = localStorage.getItem("webb21")
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => props.onSuccess())
        // .then(data => console.log(data))

    }

    return (
        <div style={CustomerCreateContainerNew}>
            <Header2>Create a Customer</Header2>
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
                    style={vatNrInput}
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
                <SubmitButton type="submit">Create Customer</SubmitButton>
            </form>
        </div>
    )
}
