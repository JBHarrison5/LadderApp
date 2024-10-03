import React from "react";

const FormInputAtom = ({ id, formMethod, placeholder, type }) => {

    let required = {}
    if (type == "name") {
        required = {required: `${placeholder} Is Required` }
    } else if (type == "email") {
        required = {
            required: "Email Is Requried",
            validate: {
                matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Invalid Email Address"
            }
        }
    } else if (type == "password") {
        required = {
            required: "Password is Required", 
            validate: {
                minLength: (v) => v.length >= 6 || "Password must be min 6 characters"

            }
        }
    } else if (type == "score") {
        required = {
            required: "Score is Required",
            validate: {
                matchPattern: (v) => /^(?:\d{2}-\d{2} \d{2}-\d{2}|(?:\d{2}-\d{2} \d{2}-\d{2} \d{2}-\d{2}))$/.test(v) || "Score must be in the format 'xx-yy xx-yy xx-yy'"
            }
        }
    }

    return (
        <input 
            id={id}
            {...formMethod(id, required)}
            placeholder={placeholder}
            className='text-center fs-6 form-control text-primary'
        />
    )
}

export default FormInputAtom