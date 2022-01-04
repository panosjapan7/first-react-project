import React, {createContext, useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css"
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CustomerList from "./components/CustomerList";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import UserCreatePage from "./pages/UserCreatePage";
import EditCustomerDetails from "./components/EditCustomerDetails";


const NameContext = createContext({})

function App() {

  const [name, setName] = useState("")
  const [customerList, setCustomerList] = useState(null)
  const [userData, setUserData] = useState(null)

//Fetches Customer List
  useEffect(() => {
    const url="https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("webb21")
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
          setCustomerList(data.results)
          // console.log(data)
          setName(data.results.name)
        })
  }, [])

//Fetches User Details
  useEffect(() => {

    const url="https://frebi.willandskill.eu/api/v1/me"
    
    const token = localStorage.getItem("webb21")

    fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => setUserData(data))

}, [])

  // function test(){
  //   console.log(customerList)
  //   console.log(userData)
  // }
  // test()

  return (
    <NameContext.Provider value={{customerList, userData}}>
      <div>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:id" element={<CustomerDetailPage />} />
            <Route path="/users/create" element={<UserCreatePage />} />
            <Route path="customers/edit/:id" element={<EditCustomerDetails />} />
          </Routes>
      </div>
     
    </NameContext.Provider>
  );
}

export {NameContext}
export default App;
