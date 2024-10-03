import React, {useState, useEffect } from 'react'
import httpClient from "../httpClient"
import AuthenicationComponent from '../components/AuthenicationComponent'
import LogoAtom from '../atoms/LogoAtom'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const LandingPage = () => {
    const { user, loading } = useUser()
    

    return (
        
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <LogoAtom />
            {loading && <p>Loading...</p>}
            {user ? (
                <Navigate to='/home' />

            ) : (
                <AuthenicationComponent />
            )}
        </div>
    )
}

export default LandingPage