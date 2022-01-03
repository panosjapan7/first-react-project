import React, {useState, useEffect} from 'react'


export default function MyPage() {

    const [myData, setMyData] = useState(null)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    useEffect(() => {

        const url="https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("webb21")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setMyData(data.results)
            setFirstName(data.firstName)
            setLastName(data.lastName)
        })


    }, [])



    return (
        <div>
            My Information

            <p>Full Name: {myData.firstName} {myData.lastName}</p>
            <p>Email: {myData.email}</p>
        </div>
    )
}
