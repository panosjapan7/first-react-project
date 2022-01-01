import React, {useState} from 'react'

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
        // .then(data => props.onSuccess())
    }

    function renderInput(type, placeholder, value, setValue){
        return <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
    }

    return (
        <div>
            <h1>Create a new User</h1>

            <form onSubmit={handleOnSubmit} >
                {renderInput("text", "First Name", firstName, setFirstName)}
                {renderInput("text", "Last Name", lastName, setLastName)}
                {renderInput("text", "Email", email, setEmail)}
                {renderInput("text", "Organisation Kind", organisationKind, setOrganisationKind)}
                {renderInput("password", "Password", password, setPassword)}

                <button typeof="submit">Create User</button>
            </form>
        </div>
    )
}
