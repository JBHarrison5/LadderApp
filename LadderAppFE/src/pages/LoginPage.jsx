import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import httpClient from '../httpClient'
import FallbackAuthenticationMolecule from '../molecules/FallbackAuthenticationMolecule';

const LoginPage = () => {
    const { register, handleSubmit } = useForm();

    const logInUser = async(formData) => {

        try {
            const resp = await httpClient.post("//localhost:5000/login", formData)

            window.location.href = "/"
        }
        catch (error) {
            if (error.response.status === 401) {
                alert("Invalid Credentials")
            }
            else {
                console.error(error)
            }
        }
    }

  return (
    <>
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <img className="rounded-circle large-logo" src="./assets/ormeauTT.png" />
            <form onSubmit={handleSubmit(logInUser)} className='d-flex flex-column'>
                <div className='my-5 d-flex space-between form-group flex-column justify-content-center gap-2'>
                    <input 
                        id="email" 
                        {...register("email")} 
                        placeholder='Email'
                        className='text-center fs-6 form-control text-primary'
                    />
                    <input 
                    id="password" 
                    {...register("password")} 
                    placeholder='Password' 
                    className='text-center fs-6 form-control text-primary'
                    />
                </div>
                <input type="submit" value="LOG IN" className='btn btn-primary text-white fs-2 fw-bold'/>
            </form>
            <FallbackAuthenticationMolecule page="login"/>
        </div>
    </>
  )
}

export default LoginPage