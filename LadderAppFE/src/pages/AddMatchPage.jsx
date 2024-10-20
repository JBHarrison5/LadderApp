import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import httpClient from '../httpClient'
import ButtonAtom from '../atoms/ButtonAtom';
import FormInputAtom from '../atoms/FormInputAtom';
import ErrorAtom from '../atoms/ErrorAtom';
import NavBarComponent from '../components/NavBarComponent';
import { format } from 'date-fns' 
import { useRanks } from '../context/RanksContext';
import { useUser } from '../context/UserContext';

import "react-datepicker/dist/react-datepicker.css"
import DatePickerAtom from '../atoms/DatePickerAtom';

const AddMatchPage = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const { user, loading } = useUser();
  const { ranks } = useRanks();

  const addMatch = async(formData) => {
    setServerError("")
    try {
        const formattedDate = format(formData.match_date, "dd/MM/yyyy HH:mm")
        formData.match_date = formattedDate
        console.log(formData)
        await httpClient.post("//localhost:5000/add_match", formData)

        window.location.href = "/"
    }
    catch (error) {
          console.error(error)
      }
  
  }

  if(loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <p>"user not logged in</p>
  }

  return (
    <>
      <div className='d-flex flex-column justify-content-cneter align-items-center'>
        <NavBarComponent />
        <h3 className='text-primary mt-3 fw-bold'>Add Match</h3>
        <hr className="border w-100 border-primary border-1 opacity-75" />
        <form onSubmit={handleSubmit(addMatch)} className='d-flex flex-column'>
          <div className='my-5 d-flex space-between form-group flex-column justify-content-center gap-2'>

            <select className="text-center fs-6 color-primary form-select text-primary" id="player_1_id" {...register("player_1_id", {required: "Player 1 is required"})}>
              <option value="">Player 1</option>
              <option value={user.id}>{user.name}</option>
            </select>
            {errors.player_1_id?.message && (
              <ErrorAtom message={errors.player_1_id.message} />
            )}

            <p className='text-primary text-center fs-3 fw-bold p-0 m-0'>VS</p>

            <select id="player_2_id" className="text-center fs-6 color-primary form-select text-primary" {...register("player_2_id", {required: "Player 2 is required"})}>
              <option value="" defaultValue>Player 2</option>
              {ranks.length === 0 ? (
                <option>No Available Opponents</option>
              ) : (
                <>
                  {ranks.map((opponent) => (
                    <option key={opponent.id} value={opponent.id}>{opponent.player}</option>
                  ))}
                </>
              )}
            </select>
            {errors.player_2_id?.message && (
              <ErrorAtom message={errors.player_2_id.message} />
            )}

            <br/>

            <select id="winner" className="text-center fs-6 color-primary form-select text-primary" {...register("winner", {required: "Winner is required"})}>
              <option value="">Select Winner</option>
              <option value="player_1">Player 1</option>
              <option value="player_2">Player 2</option>
            </select>
            {errors.winner_id?.message && (
              <ErrorAtom message={errors.winner_id.message} />
            )}

            <br/>

            <FormInputAtom id="score" formMethod={register} placeholder="Score" type="score" errors={errors}/>

            {errors.score?.message && (
              <ErrorAtom message={errors.score.message} />
            )}

            <br/>

            <DatePickerAtom name="match_date" future={false} control={control} />
            {errors.match_date?.message && (
              <ErrorAtom message={errors.match_date.message} />
            )}
            </div>
            <div className='d-flex flex-column justify-content-center gap-2'>
              {serverError && <ErrorAtom message={serverError} />}
              <ButtonAtom text="add match" size="large" />
            </div>
        </form>
      </div>
    </>
  )
}

export default AddMatchPage