import React from "react";
import { Controller } from "react-hook-form"
import DatePicker from "react-datepicker";
import { capitaliseSentence } from "../helpers/helpers";

const DatePickerAtom = ({ name, future, control }) => {

    const min_date = future ? new Date() : null;
    const max_date = future ? null : new Date();
    
    const name_as_string = capitaliseSentence(name)

    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={null}
                rules={{
                    required: `${name_as_string} Is Required`,
                }}
                render={({ field: { onChange, value}}) => (
                <DatePicker 
                    selected={value} 
                    placeholderText={`Select ${name_as_string}`}
                    dateFormat="MMMM d, yyyy HH:mm aa" 
                    onChange={onChange} 
                    minDate={min_date}
                    maxDate={max_date}
                    showTimeSelect
                    timeFormat="HH:mm"
                    className="text-center fs-6 color-primary form-control text-primary"
                />
                )}
            />
        </>
    )
}

export default DatePickerAtom