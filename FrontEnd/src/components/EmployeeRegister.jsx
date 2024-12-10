import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Button} from 'flowbite-react'
import { employeeRegisterSchema } from '../yupSchema'
import client from '../axiosURL'
import { ProfileSection } from './employeeInputs/ProfileSection'
import { AddressPortion } from './employeeInputs/AddressPortion'
import { ContactPortion } from './employeeInputs/ContactPortion'

const EmployeeRegisterForm = ()=>{
    const {handleSubmit, register, control, reset, formState:{errors}} = useForm(
        {resolver: yupResolver(employeeRegisterSchema)}
    )
    const fields = {register,control,errors}
    const submit = result=>{
        let data = result
        data.profileImage = data.profileImage[0]
        (data)
        client.post('/employee/create',data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response=>{
            response.status === 200 ? reset() : alert(`Something went wrong`)
        })
    }
    
    return(
        <>
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit(submit)}>
                <ProfileSection {...fields} />
                <AddressPortion {...fields} />
                <ContactPortion {...fields}/>
                <Button className="text-text border-b-2 border-accent/20 rounded-md bg-primary" color='default' type='submit'>Submit</Button>
            </form>
        </div>
        {/* <Footer/> */}
        </>
    )
}

export default EmployeeRegisterForm