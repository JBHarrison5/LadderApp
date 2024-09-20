import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import httpClient from '../httpClient'
import FallbackAuthenticationMolecule from '../molecules/FallbackAuthenticationMolecule';

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const registerUser = async(formData) => {

        try {
            const resp = await httpClient.post("//localhost:5000/register", formData)

            window.location.href = "/"
        }
        catch (error) {
            if (error.response.status === 409) {
                alert("Account for this email already exists")
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

        <form onSubmit={handleSubmit(registerUser)} className='d-flex flex-column'>
          <div className='my-5 d-flex space-between form-group flex-column justify-content-center gap-2'>
            <input 
              id="firstName" 
              {...register("firstName", { 
                required: "First Name Is Required" 
                })} 
              placeholder='First Name'
              className='text-center fs-6 form-control text-primary'
            />

            {errors.firstName?.message && (
              <small className = "text-center text-primary">{errors.firstName.message}</small>
            )}

            <input 
              id="lastName" 
              {...register("lastName", { 
                required: "Last Name Is Required" 
                })} 
              placeholder='Second Name' 
              className='text-center fs-6 form-control text-primary'  
            />

            {errors.lastName?.message && (
              <small className = "text-center text-primary">{errors.lastName.message}</small>
            )}

            <input
              id="email" 
              {...register("email", { 
                required: "Email Is Required",
                validate: {
                  maxLength: (v) => v.length <= 50 || "Email should be no longer than 50 characters",
                  matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Invalid Email Address"
                } 
                })} 
                placeholder='Email'
                className='text-center fs-6 form-control text-primary'
            />

            {errors.email?.message && (
              <small className = "text-center text-primary" >{errors.email.message}</small>
            )}

            <input
              id="password"
              {...register("password", { 
                required: "Password Is Required", 
                validate: {
                  minLength: (v) => v.length >= 6 || "Password must be at least 6 characters in length"
                }
                })} 
                placeholder='Password' 
                className='text-center fs-6 form-control text-primary'
            />

            {errors.password?.message && (
              <small className = "text-center text-primary">{errors.password.message}</small>
            )}
            </div>
            <input type="submit" value="REGISTER" className='btn btn-primary text-white fs-2 fw-bold'/>
        </form>
        <FallbackAuthenticationMolecule page="register"/>
      </div>
    </>
  )
}

export default RegisterPage