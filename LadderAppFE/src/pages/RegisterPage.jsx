import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import httpClient from '../httpClient'
import FallbackAuthenticationMolecule from '../molecules/FallbackAuthenticationMolecule';
import LogoAtom from '../atoms/LogoAtom';
import ButtonAtom from '../atoms/ButtonAtom';
import FormInputAtom from '../atoms/FormInputAtom';
import ErrorAtom from '../atoms/ErrorAtom';

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState("");

    const registerUser = async(formData) => {
        setServerError("")
        try {
            const resp = await httpClient.post("//localhost:5000/register", formData)

            window.location.href = "/"
        }
        catch (error) {
            if (error.response.status === 409) {
                setServerError("Account for this email already exists")
            }
            else {
              console.error(error)
            }
        }
    }

  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <LogoAtom />
        <form onSubmit={handleSubmit(registerUser)} className='d-flex flex-column'>
          <div className='my-5 d-flex space-between form-group flex-column justify-content-center gap-2'>
            <FormInputAtom id="firstName" formMethod={register} placeholder="First Name" type="name" errors={errors}/>

            {errors.firstName?.message && (
              <ErrorAtom message={errors.firstName.message} />
            )}

            <FormInputAtom id="lastName" formMethod={register} placeholder="Second Name" type="name" />

            {errors.lastName?.message && (
              <ErrorAtom message={errors.lastName.message} />
            )}

            <FormInputAtom id="email" formMethod={register} placeholder="Email" type="email" />

            {errors.email?.message && (
              <ErrorAtom message={errors.email.message} />
            )}

            <FormInputAtom id="password" formMethod={register} placeholder="Password" type="password" />

            {errors.password?.message && (
              <ErrorAtom message={errors.password.message} />
            )}
            </div>
            <div className='d-flex flex-column justify-content-center gap-2'>
              {serverError && <ErrorAtom message={serverError} />}
              <ButtonAtom text="register" size="large" />
            </div>
        </form>

        <FallbackAuthenticationMolecule page="register"/>
      </div>
    </>
  )
}

export default RegisterPage