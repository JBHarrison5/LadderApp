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
        <div className='d-flex flex-column justify-content-center'>
            <img className="rounded-circle" src="./assets/ormeauTT.png" />

            {/* ternery that presents a different screen depending on whether user is logged
            needs tidied. Do you need this */}
            {user != "" ? (
                <>
                    <h1>Logged In</h1>
                    <h2>Your Email: {user.email}</h2>
                    <button onClick={logoutUser}>Logout</button>
                </>

            ) : (
                <div className='my-5 d-flex flex-column justify-content-center'>
                    <a href="/register" className='text-center'>
                        <button className='fs-2 px-5 py-2 fw-bold'>REGISTER</button>
                    </a>
                    <div className='my-5 d-flex flex-column'>
                        <p className='text-center fs-5 ormeau-pink'>Already Have An Account?</p>
                        <a className="text-center ormeau-pink fs-4" href='/login'>
                            <button className='fs-6 px-2 py-2'>LOG IN</button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LandingPage