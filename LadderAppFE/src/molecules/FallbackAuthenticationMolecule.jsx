import React from "react";

const FallbackAuthenticationMolecule = ( { page }) => {
    
    let message = "";
    let link = ""
    let button = ""

    if (page == "login") {
        message = "Don't Have An Account?"
        link = "/register"
        button = "REGISTER"
    }  else {
        message = "Already Have An Account?"
        link = "/login"
        button = "LOG IN"
    }

    return (
        <>
            <div className='my-5 d-flex flex-column'>
                <p className='text-center fs-5 ormeau-pink'>{message}</p>
                <a className="text-center ormeau-pink fs-4" href={link}>
                    <button className='btn btn-primary text-white fw-bold'>{button}</button>
                </a>
            </div>
        </>
    );
};

export default FallbackAuthenticationMolecule
