import React from "react";
import FallbackAuthenticationMolecule from "../molecules/FallbackAuthenticationMolecule";
const AuthenicationComponent = () => (
    <>
        <div className='my-5 d-flex flex-column justify-content-center'>
            <a href="/register" className='text-center'>
                <button className='btn btn-primary text-white fs-2 fw-bold'>REGISTER</button>
            </a>
            <FallbackAuthenticationMolecule page="register"/>
        </div>
    </>
)

export default AuthenicationComponent