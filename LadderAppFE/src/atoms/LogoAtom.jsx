import React from "react";

const LogoAtom = ( {size} ) => {
    
    const styling = `rounded-circle ${size === 'small' ? 'small-logo' : 'large-logo'}`;

    return (
        <img className={styling} src="./assets/ormeauTT.png" />
    )

}

export default LogoAtom