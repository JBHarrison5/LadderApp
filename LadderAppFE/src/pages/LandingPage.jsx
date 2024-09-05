import React, {useState, useEffect } from 'react'
import httpClient from "../httpClient"

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
        <div>
            <h1>Welcome to react app</h1>

            {/* ternery that presents a different screen depending on whether user is logged
            needs tidied */}
            {user != "" ? (
                <>
                    <h1>Logged In</h1>
                    <h2>Your Email: {user.email}</h2>
                    <button onClick={logoutUser}>Logout</button>
                </>

            ) : (
                <div>
                    <p>Your are not logged in</p>
                    <a href="/login">
                        <button>Log In</button>
                    </a>
                    <br/>
                    <a href='/register'>
                        <button>Register</button>
                    </a>
                </div>
            )}
        </div>
    )
}

export default LandingPage