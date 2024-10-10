import React from "react";
import LogoAtom from '../atoms/LogoAtom'
import httpClient from "../httpClient"


const NavBarComponent = () => {

    const logoutUser = async () => {
        const resp = await httpClient.post("//localhost:5000/logout")
        window.location.href = "/"
    }

    return (
    <nav className="navbar bg-primary navbar-expand-lg w-100">
        <div className="container-fluid">
            <a className="navbar-brand" href="#"><LogoAtom size="small"/></a>
            <button className="navbar-toggler border-3 border-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav color-white gap-1 mt-2">
                    <button className="nav-item w-50 text-center btn btn-outline-light m-0">
                        <a className="text-white text-decoration-none" aria-current="page" href="/home">HOME</a>
                    </button>
                    <button className="nav-item w-50 text-center btn btn-outline-light m-0">
                        <a className="text-white text-nowrap text-decoration-none" aria-current="page" href="/add_match">ADD MATCH</a>
                    </button>
                    <button className="nav-item w-50 text-center btn btn-outline-light m-0">
                        <a className="text-white text-nowrap text-decoration-none" aria-current="page" href="/table">FULL TABLE</a>
                    </button>
                    <button className="nav-item w-50 text-center btn btn-outline-light m-0" onClick={logoutUser}>
                        LOGOUT
                    </button>
                </ul>
            </div>
        </div>
    </nav>   
    )
}

export default NavBarComponent