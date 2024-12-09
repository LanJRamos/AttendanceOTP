'use client'

import { TextInput, Label, Button, Select, Card } from "flowbite-react"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { userSchema } from '../yupSchema'
import client from '../axiosURL'
import { DevTool } from "@hookform/devtools"
import { Link } from "react-router-dom"

const userCreate = () => {

    const { register, handleSubmit, control, formState: {errors} } = useForm({
        resolver: yupResolver( userSchema ),
    })

    const onSubmit = (data) => {
        const {repeatpassword,...results} = data
        console.log('Registration Sent', results)
        client.post('user/create',results)
        .then(window.location = "/dashboard")
        .catch(err=>console.error(err))
    }

    return(
        <>
            <div>
                <form className="flex max-w-md flex-col gap-4" onSubmit={ handleSubmit(onSubmit) }>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email">Email</Label>
                        <TextInput 
                            type="email" 
                            id="email" 
                            placeholder="name@domain.com" 
                            { ...register('email') } 
                            color={ errors.email ? 'failure' : '' } 
                            helperText={ <>{ errors.email ? errors.email.message : ''}</> }
                        />
                    </div>
                    <div className="mb-2 block">
                        <Label htmlFor="userPassword" value="Your password">Password</Label>
                        <TextInput 
                            type="password" 
                            id="userPassword" 
                            { ...register('userPassword') } 
                            color={ errors.userPassword ? 'failure' : '' } 
                            helperText={ <>{ errors.userPassword ? errors.userPassword.message : ''}</> }
                        />
                    </div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                        <TextInput 
                            id="repeat-password" 
                            type="password" 
                            { ...register('repeatpassword') } 
                            color={ errors.repeatpassword ? 'failure' : '' } 
                            helperText={ <>{ errors.repeatpassword ? errors.repeatpassword.message : ''}</> }
                        />
                    </div>
                    <div className="max-w-md">
                        <Label htmlFor="positions" value="Position" />
                        <Select 
                            id="positions" { ...register('position') } 
                            color={ errors.position ? 'failure' : '' } 
                            helperText={ <>{ errors.position ? errors.position.message : ''}</> }
                        >
                            <option className='color-gray-500'>---</option>
                            <option value="admin">Admin</option>
                            <option value="management">Management</option>
                            <option value="suspended">Suspended</option>
                        </Select>
                    </div>
                    <Button type="submit" className="text-text border-b-2 border-accent/20 rounded-md bg-primary">
                        Register new account
                    </Button>
                </form>
                <DevTool control={control}/>
            </div>
        </>
    )
}

export default userCreate