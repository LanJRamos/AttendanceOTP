import {Button, Select, Card} from 'flowbite-react'
import MultiDatePicker from './MultiSelectDate'
import {Controller} from 'react-hook-form'

const ShiftForm = ({fields,employees})=>{
    const {register, control, formState:{errors}} = fields

    return(
        <Card className='max-w-md bg-emerald-100 border-t-slate-500'>
            <Button color='light' type='submit' className='text-black'>SUBMIT?</Button>
            <Controller
                control={control}
                name='dates'
                render={({
                    field: {onChange, name, value},
                    formState: {errors}
                })=>(
                    <>
                    <MultiDatePicker employees={employees} value={value} onChange={onChange} register={register}/>
                    {errors && errors[name] && errors[name].type === "required" && (
                        <span>your error message !</span>
                        )}
                    </>
                )}
            />
            
        </Card>
    )
}

export default ShiftForm