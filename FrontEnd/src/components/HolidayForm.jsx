'use client'

import { Button, TextInput, Label, Datepicker, Card } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { holidaySchema } from '../yupSchema'
import { Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import client from '../axiosURL'

const HolidayForm = () => {
    const { register, handleSubmit, formState: {errors}, control } = useForm({
        resolver: yupResolver( holidaySchema ),
    })

    const onSubmit = data=> {
        const holidays = data
        console.log(data)
        console.log('Holiday Created', {holidays})
        client.post(`holidays/create`,{holidays})
        .then(()=>window.location = "/dashboard/holidayTable")
        .catch(err=>console.error(err))
    }

    return(
        <>
            <div className="flex justify-center items-center">
                    <form className="flex max-w-md flex-col gap-4" onSubmit={ handleSubmit(onSubmit) }>
                        <div className="max-w-md">
                            <Label htmlFor="holidayName" value="Holiday" />
                            <TextInput 
                                id="holidayName" 
                                type="text" 
                                placeholder="Christ-mas"
                                {...register("holidayName")}
                                color={ errors.holidayName ? 'failure' : '' } 
                                helperText={ <>{ errors.holidayName ? errors.holidayName.message : ''}</> }
                            />
                        </div>
                        <div className="max-w-md">
                            <Label htmlFor="holidayDate" value="Holiday Date" />
                            <Controller
                                name='holidayDate'
                                control={control}
                                color={errors.holidayDate ? 'failure' : ''}
                                helperText={<>
                                    {errors.holidayDate ? errors.holidayDate.message : ''}
                                </>}
                                render={({ field: { onChange, value } }) => (<Datepicker
                                    id="holidayDate"
                                    placeholder='Select Date'
                                    selected={value}
                                    autoHide={true}
                                    onSelectedDateChanged={(date) => onChange(date)} />
                                )}
                            />
                        </div>
                        <Button type="submit">Create Holiday</Button>
                    </form>
                    <DevTool control={control}/>
            </div>
            
        </>
    )
}

export default HolidayForm