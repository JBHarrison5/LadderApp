import React from "react";
import { useForm } from "react-hook-form"
import ButtonAtom from "../atoms/ButtonAtom";
import { format } from 'date-fns' 
import httpClient from "../httpClient";
import ErrorAtom from "../atoms/ErrorAtom";
import { useUser } from "../context/UserContext";
import DatePickerAtom from "../atoms/DatePickerAtom";

const ChallengeModalMolecule = ({ challengee_id, challengee_name }) => {
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useUser();
    const addChallenge = async(formData) => {
        
        try {
            const formattedDate_1 = format(formData.match_date_1, "dd/MM/yyyy HH:mm")
            const formattedDate_2 = format(formData.match_date_2, "dd/MM/yyyy HH:mm")
            formData.match_date_1 = formattedDate_1
            formData.match_date_2 = formattedDate_2
            await httpClient.post("//localhost:5000/add_challenge", formData)

            window.location.href = "/"
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
    <>
        <div className="modal fade" id={`challengeModal-${challengee_id}`} tabIndex="-1" role="dialog" aria-labelledby="ChallengeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered " role="document">
                <div className="modal-content bg-dark border border-primary">
                    <div className="modal-header text-white d-flex flex-column justify-content-between">
                        <h5 className="modal-title" id="challengeModalLabel">{`Send Challenge To`}</h5>
                        <h5 className="modal-title" id="challengeModalLabel">{challengee_name}</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(addChallenge)}>
                            <input type="hidden" name="challenger_id" value={user.id} {...register("challenger_id")}/>
                            <input type="hidden" name="challengee_id" value={challengee_id} {...register("challengee_id")}/>
                            <div className="d-flex flex-column gap-2 my-4 justify-content-center align-items-center space-between">
                                <DatePickerAtom name="match_date_1" future={true} control={control} />
                                {errors.match_date_1?.message && (
                                <ErrorAtom message={errors.match_date_1.message} />
                                )}
                                <DatePickerAtom name="match_date_2" future={true} control={control} />
                                {errors.match_date_2?.message && (
                                <ErrorAtom message={errors.match_date_2.message} />
                                )}
                                <ButtonAtom text="challenge" size="large" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary text-white" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ChallengeModalMolecule