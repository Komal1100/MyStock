import React from 'react'
import  {Label} from "@/components/ui/label";
import {Controller} from "react-hook-form";
import {CountryDropdown} from "@/components/ui/country-dropdown";

function CountrySelectField({name , label , error , control ,required=false}:CountrySelectProps) {
    return (
        <>
            <Label htmlFor={name} className="form-label">{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (

                        <CountryDropdown
                            placeholder="Country"
                            defaultValue={field.value}
                            onChange={(country) => {
                                field.onChange(country.alpha3);
                            }}
                        />

                )}
            >

            </Controller>
        </>
    )
}

export default CountrySelectField
