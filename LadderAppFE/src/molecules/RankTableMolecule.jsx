import React from "react";
import ButtonAtom from "../atoms/ButtonAtom";
import ModalButtonAtom from "../atoms/ModalButtonAtom";
import ChallengeModalMolecule from "./ChallengeModalMolecule";
const RankTableMolecule = ({ ranks, user }) => {

    return (
        <table className='table w-75 text-center table-dark table-bordered border-3 border-primary table-striped'>
            <thead className='text-primary'>
                <tr>
                    <th scope="col">RANK</th>
                    <th scope="col">PLAYER</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className='align-items-center'>
                {ranks.map((rank) => (
                    rank.id != user.id ?
                <tr key={rank.id}>
                    <td className='align-middle'>{rank.rank}</td>
                    <td className='align-middle'>{rank.player}</td>
                    <td><ModalButtonAtom text="C" data_toggle="modal" data_target={`#challengeModal-${rank.id}`}/></td>
                    <ChallengeModalMolecule challengee_id={rank.id} challengee_name={rank.player}/>
                </tr> : 
                <tr key={rank.id}className='table-primary table-bordered border-3 border-primary'>
                    <td className='align-middle'>{rank.rank}</td>
                    <td className='align-middle'>{rank.player}</td>
                    <td></td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RankTableMolecule