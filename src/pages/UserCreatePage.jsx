import React, {useState} from 'react'
import {Link} from "react-router-dom" 
import styled from 'styled-components';

const row = {
    marginTop: "20px"
}

const Header2 = styled.h2`
        font-family: Courier;
    `

const LinkParagraphContainer = styled.p`
    margin-top: 20px;
`
const linkStyle = {
    color: "red",
    textDecoration: "none",
};

const constFormInputNew = {
    fontFamily: "Courier",
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

export default function UserCreatePage(props) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [organisationKind, setOrganisationKind] = useState("")
    const [password, setPassword] = useState("")
    

    function handleOnSubmit(e){
        e.preventDefault()
        console.log(firstName, lastName, email, organisationKind, password)
        const url="https://frebi.willandskill.eu/auth/users/"
        const payload = {email, organisationKind, password, firstName, lastName}
        const token = localStorage.getItem("webb21")
        fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    function renderInput(type, placeholder, value, setValue){
        return <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                style={constFormInputNew}
            />
    }

    return (
        <div className="container">
            <div className="row" style={row}>
                <div className="col-md-3">
                    <LinkParagraphContainer><Link to="/home" style={linkStyle}>Home Page</Link></LinkParagraphContainer>
                    <LinkParagraphContainer><Link to="/login" style={linkStyle}>Login Page</Link></LinkParagraphContainer>
                    <LinkParagraphContainer><Link to="/users/create" style={linkStyle}>Create a User</Link></LinkParagraphContainer>
                </div>

                <div className="col-md-9">
                    <Header2>Create a new User</Header2>

                    <form onSubmit={handleOnSubmit} >
                        {renderInput("text", "First Name", firstName, setFirstName)}
                        <br></br>
                        {renderInput("text", "Last Name", lastName, setLastName)}
                        <br></br>
                        {renderInput("text", "Email", email, setEmail)}
                        <br></br>
                        {renderInput("text", "Organisation Kind", organisationKind, setOrganisationKind)}
                        <br></br>
                        {renderInput("password", "Password", password, setPassword)}
                        <br></br>
                        <SubmitButton typeof="submit">Create User</SubmitButton>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
