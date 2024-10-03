import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import httpClient from '../httpClient'
import FallbackAuthenticationMolecule from '../molecules/FallbackAuthenticationMolecule';
import LogoAtom from '../atoms/LogoAtom';
import ButtonAtom from '../atoms/ButtonAtom';
import FormInputAtom from '../atoms/FormInputAtom';
import ErrorAtom from '../atoms/ErrorAtom';

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const [serverError, setServerError] = useState();
    
    const logInUser = async(formData) => {
        setServerError("")
        try {
            const resp = await httpClient.post("//localhost:5000/login", formData)

            window.location.href = "/"
        }
        catch (error) {
            if (error.response.status === 401) {
                setServerError("Incorrect email or password")
            }
            else {
                console.error(error)
            }
        }
    }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <LogoAtom />
        <form onSubmit={handleSubmit(logInUser)} className='d-flex flex-column'>
            <div className='my-5 d-flex space-between form-group flex-column justify-content-center gap-2'>
                <FormInputAtom id="email" formMethod={register} placeholder="Email" />
                <FormInputAtom id="password" formMethod={register} placeholder="Password" />
            </div>
            <div className='d-flex flex-column justify-content-center gap-2'>
                {serverError && <ErrorAtom message={serverError} />}
                <ButtonAtom text="log in" size="large" />
            </div>
        </form>
        <FallbackAuthenticationMolecule page="login"/>
    </div>
  )
}

export default LoginPage