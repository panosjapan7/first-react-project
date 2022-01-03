import React, {createContext, useContext, useEffect, useState} from 'react'
import { NameContext } from '../App'
import CustomerList from '../components/CustomerList'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserContext = createContext({})

const HomePageDiv = styled.div`
    margin-top: 20px;
`

const Header5 = styled.h5`
    font-size: 22px;
    font-family: Courier;
` 

const HomePageParagraph = styled(Header5)`
    font-size: 15px;
`

const HomePageLink = styled(Header5)`
    font-size: 18px;
`
    const linkStyle = {
        color: "red",
        textDecoration: "none",
    };



export default function HomePage() {

    const [myData, setMyData] = useState(null)

    function test(){
        console.log(myData)
    }

    test()

    useEffect(() => {

        const url="https://frebi.willandskill.eu/api/v1/me"
        
        const token = localStorage.getItem("webb21")

        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setMyData(data))

    }, [])

    const {name, setName} = useContext(NameContext)

    function test(){
        console.log(myData)
      }
    
      test()

    return (
        <UserContext.Provider value={{myData}}>
            <div className="container">
                <div className="row">

                    <div className="col-md-3">
                        {myData && (
                        <HomePageDiv>
                            <Header5>Hello, {myData.firstName} {myData.lastName}</Header5>
                            <HomePageParagraph>Your email address is {myData.email} </HomePageParagraph>
                            <HomePageLink><Link to="/login" style={linkStyle}>Login Page</Link></HomePageLink>
                            <HomePageLink><Link to="/users/create" style={linkStyle}>Create a User</Link></HomePageLink>
                        </HomePageDiv>
                        )}

                        <div>
                            {/* <Link></Link> */}
                        </div>
                    </div>

                    <div className="col-md-9">
                        <CustomerList />
                    </div>

                </div>
            </div>

        </UserContext.Provider>
    )
}

export {UserContext}