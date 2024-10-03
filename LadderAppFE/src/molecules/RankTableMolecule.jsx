import React from "react";
import ButtonAtom from "../atoms/ButtonAtom";
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
                    <td><ButtonAtom text="c" /></td>
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