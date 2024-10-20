import React from "react";

const ModalButtonAtom = ({ text, size, data_toggle, data_target }) => {
    const styling = `btn btn-primary text-white fw-bold ${size === 'large' ? 'fs-2' : ''}`;
    return (
        <>
            <button className={styling} data-bs-toggle={data_toggle} data-bs-target={data_target}>
                { text.toUpperCase() }
            </button>
        </>
    )
}

export default ModalButtonAtom