import React, { useState, useEffect } from 'react'
import httpClient from '../httpClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import NavBarComponent from '../components/NavBarComponent'
import RankTableMolecule from '../molecules/RankTableMolecule';
import InformationModalMolecule from '../molecules/InformationModalMolecule';
import { useRanks } from '../context/RanksContext'

const HomePage = () => {

    const [user, setUser] = useState("")
    const { ranks } = useRanks();
    
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

    return (
        <div className='d-flex flex-column justify-content-cneter align-items-center'>
            <NavBarComponent />
            {ranks.length === 0 ? (
                <h3>Waiting for approval. Contact x...</h3>
            ) : (
            <>
                <h3 className='text-primary mt-3 fw-bold'>Userx's Table</h3>
                <hr className="border w-100 border-primary border-1 opacity-75" />
                <div className='d-flex m-3 w-75 text-primary align-items-center justify-content-between'>
                    <button type="button" className="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#infoModal">
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                    <h4 className='align-middle m-0'>CHALLENGES</h4>
                </div>

                <InformationModalMolecule />
                <RankTableMolecule ranks={ranks} user={user} />
            </>
            )
        }
        </div>
    )
}

export default HomePage