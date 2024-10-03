import React, { useState, useEffect } from 'react'
import httpClient from '../httpClient'
import NavBarComponent from '../components/NavBarComponent'
import RankTableMolecule from '../molecules/RankTableMolecule';

const FullTablePage = () => {

    const [user, setUser] = useState("")
    const [ranks, setRanks] = useState([])

    //get user info
    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                setUser(resp.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    //get all ranks
    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("http://localhost:5000/ranks")
                setRanks(resp.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <div className='d-flex flex-column justify-content-cneter align-items-center'>
            <NavBarComponent />
            <h3 className='text-primary mt-3 fw-bold'>Full Table</h3>
            <hr className="border w-100 border-primary border-1 opacity-75" />
            <RankTableMolecule ranks={ranks} user={user} />
        </div>
    )
}
export default FullTablePage