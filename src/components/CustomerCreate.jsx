import React, {useState} from 'react'

export default function CustomerCreate(props) {

    const [name, setName] = useState("")
    const [organisationNr, setOrganisationNr] = useState("")
    const [vatNr, setVatNr] = useState("")
    const [reference, setReference] = useState("")
    const [paymentTerm, setPaymentTerm] = useState("")
    const [website, setWebsite] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    function renderInput(type, placeholder, value, setValue){
        return <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
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
        <div>
            <h2>Create a Customer</h2>
            <form onSubmit={handleOnSubmit} >
                {renderInput("text", "Name", name, setName)}
                <br />
                {renderInput("text", "Org. Nr.", organisationNr, setOrganisationNr)}
                <br />
                {/* {renderInput("text", "VAT Nr. (Country Code + 10 digits)", vatNr, setVatNr)} */}
                <input
                    type="text"
                    placeholder="VAT nr. (SE10-digits)"
                    value={vatNr}
                    onChange={e => setVatNr(e.target.value)}
                    pattern="SE[0-9]{10}"
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
                <button type="submit">Create Customer</button>
            </form>
        </div>
    )
}
