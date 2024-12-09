import { Datepicker, Button } from 'flowbite-react'
import { useState } from 'react'

const TimeRange = ({register})=>{
    return(
        <>
            <input {...register('timeIn')} type='time'/>
            <input {...register('timeOut')} type='time'/>
        </>
    )
}

export default TimeRange