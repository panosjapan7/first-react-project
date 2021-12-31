import React, {useState, useEffect, useContext} from 'react'
import CustomerCreate from './CustomerCreate'
import {Link} from "react-router-dom"
import { NameContext } from '../App'
import styled from 'styled-components'


export default function CustomerList() {

    const CustomerContainerDiv = styled.div`
        margin-top: 20px;        
    `

    const CustomerLink = styled(Link)`
        font-family: Courier;    
        text-decoration: none;
        color: black;
        font-weight: 600;
    `

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

    const [customerList, setCustomerList] = useState(null)
    // const {customerList} = useContext(NameContext)

    useEffect(() => {
        fetchData()
        console.log(customerList)
    }, [])

    function fetchData(){
        const url="https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("webb21")
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setCustomerList(data.results))
    }

    // function clgList(e){
    //     console.log(customerList)
    // }

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
    }

    return (
        <div className="container">
            
            <div className="row">

                <div className="col-md-8">
                    <CustomerCreate onSuccess={fetchData} />
                </div>
                
                <div className="col-md-4">
                    {/* <button onClick={fetchData}>Refresh</button> */}
            
                    {customerList && customerList.map((item, index) => {
                        return <CustomerContainerDiv key={item.id}> 
                            <p key={index}>
                                        <CustomerLink to={`/customers/${index}`} >Customer: {item.name}</CustomerLink>
                            </p>
                            <DeleteCustomerButton onClick={e => handleOnDelete(item.id)} >Delete Customer</DeleteCustomerButton>
                        </CustomerContainerDiv>
                    })}
                </div>

            </div>
            
            
            
        </div>
    )
}
