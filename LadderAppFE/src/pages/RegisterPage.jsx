import React, { useState } from 'react'
import httpClient from '../httpClient'

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registerUser = async() => {
        console.log(email)
        console.log(password)

        try {
            const resp = await httpClient.post("//localhost:5000/register", {
                email,
                password
            })

            window.location.href = "/"
        }
        catch (error) {
            if (error.response.status === 409) {
                alert("Account for this email already exists")
            }
        }
    }

  return (
    <div>
        <h1>Register account</h1>
        <form>
            <label>Email: </label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password: </label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" onClick={registerUser}>Submit</button>
        </form>
    </div>
  )
}

export default RegisterPage