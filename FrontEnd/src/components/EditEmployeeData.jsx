// How will i get/retrieve the data and display in a form for editing
import client from "../axiosURL"
import { yupResolver } from "@hookform/resolvers/yup"
import { ProfileSection } from "./editEmployeeInputs/ProfileSection"
import { AddressPortion } from "./editEmployeeInputs/AddressPortion"
import { ContactPortion } from "./editEmployeeInputs/ContactPortion"
import { employeeRegisterSchemaUpdate } from "../yupSchema"
import {useForm} from 'react-hook-form'
import { Button } from "flowbite-react"
import { Link, useParams } from "react-router-dom"
import { useState , useEffect} from "react"

const EditEmployeeForm = () => {
    const {handleSubmit, register, control, reset, formState:{errors}} = useForm(
        {resolver: yupResolver(employeeRegisterSchemaUpdate)}
    )

    const [employee,setEmployee] = useState([])
    const [address, setAddress] = useState([])
    const {id} = useParams()

    useEffect(() => {
        client.get(`employee/`+ id)
        .then(res => setEmployee(res.data[0]))
        // .then(res => console.log(res.data[0]))
        .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        client.get(`address/`+ id)
        .then(res => setAddress(res.data[0]))
        .catch(err => console.log(err))
    }, [])

    const fields = {register,control,errors,employee,address}
    
    const submit = result=>{
        let data = result;
        data.profileImage = data.profileImage[0]
        (data)
        client.put(`employee/${id}`,data,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        }).then(res=>{
            res.status === 200 ? reset() : alert("Something went Wrong");
        })
    }

    return (
        <>
            <div className="relative">
                <form onSubmit={handleSubmit(submit)}>
                    <ProfileSection {...fields}/>
                    <AddressPortion {...fields}/>
                    <ContactPortion {...fields}/>
                    <Button className="text-text border-b-2 border-accent/20 rounded-md bg-primary absolute end left-0" color='green' type='submit'>Update</Button>
                    <Link to={'/dashboard/employee'}>
                        <Button className="text-text border-b-2 border-accent/20 rounded-md bg-primary absolute end right-0" color='red'>Back</Button>
                    </Link>
                </form>
            </div>
        </>
    )
}
export default EditEmployeeForm
