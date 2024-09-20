import React, {useState, useEffect } from 'react'
import httpClient from "../httpClient"
import LoggedInUser from '../components/LoggedInUserComponent'
import AuthenicationComponent from '../components/AuthenicationComponent'

const LandingPage = () => {
    const [user, setUser] = useState("")

    const logoutUser = async () => {
        const resp = await httpClient.post("//localhost:5000/logout")
        window.location.href = "/"
    }
    
    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                setUser(resp.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <img className="rounded-circle large-logo" src="./assets/ormeauTT.png" />

            {user ? (
                // probably change to a home page redirect
                <LoggedInUser user={user} onLogout={logoutUser} />

            ) : (
                <AuthenicationComponent />
            )}
        </div>
    )
}

export default LandingPage