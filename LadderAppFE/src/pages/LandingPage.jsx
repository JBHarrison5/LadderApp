import React, {useState, useEffect } from 'react'
import httpClient from "../httpClient"
import AuthenicationComponent from '../components/AuthenicationComponent'
import LogoAtom from '../atoms/LogoAtom'
import { Navigate } from 'react-router-dom'

const LandingPage = () => {
    const [user, setUser] = useState("")
    
    // get user info
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
            <LogoAtom />
            {user ? (
                <Navigate to='/home' />

            ) : (
                <AuthenicationComponent />
            )}
        </div>
    )
}

export default LandingPage