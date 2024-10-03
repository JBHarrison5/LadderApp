import React from "react";
import FallbackAuthenticationMolecule from "../molecules/FallbackAuthenticationMolecule";
import ButtonAtom from "../atoms/ButtonAtom";

const AuthenicationComponent = () => (
    
    <div className='my-5 d-flex flex-column justify-content-center'>
        <a href="/register" className='text-center'>
            <ButtonAtom text="register" size="large" />
        </a>
        <FallbackAuthenticationMolecule page="register"/>
    </div>
)

export default AuthenicationComponent