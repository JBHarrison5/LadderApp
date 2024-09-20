import React from "react";

const ButtonAtom = ({ text, size }) => {
    const styling = `btn btn-primary text-white fw-bold ${size === 'large' ? 'fs-2' : ''}`;

    return (
        <>
            <button className={styling}>
                { text.toUpperCase() }
            </button>
        </>
    )
}

export default ButtonAtom