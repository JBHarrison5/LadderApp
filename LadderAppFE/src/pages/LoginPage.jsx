import React, { useState } from 'react'
import httpClient from '../httpClient'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const logInUser = async() => {
        console.log(email)
        console.log(password)

        try {
            const resp = await httpClient.post("//localhost:5000/login", {
                email,
                password
            })

            window.location.href = "/"
        }
        catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Credentials")
            }
        }
    }

  return (
    <div>
        <h1>Log in to account</h1>
        <form>
            <label>Email: </label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password: </label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" onClick={logInUser}>Submit</button>
        </form>
    </div>
  )
}

export default LoginPage