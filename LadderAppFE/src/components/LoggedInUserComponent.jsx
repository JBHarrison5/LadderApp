import React from "react";

const LoggedInUser = ({ user, onLogout }) => (
    <>
        <h1 className="ormeu-pink">Logged In</h1>

        <h2>Your Email: {user.email}</h2>
        <button onClick={onLogout}>Logout</button>
    </>
);

export default LoggedInUser;