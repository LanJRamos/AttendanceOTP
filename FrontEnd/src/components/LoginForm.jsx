'use client'

import { useState,useContext } from "react";
import { TextInput, Label, Button, Alert } from "flowbite-react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {loginSchema} from '../yupSchema'
import client from '../axiosURL'
import {useNavigate} from 'react-router-dom'

const loginForm = ()=>{
  const [alertModal,setAlertModal] = useState(false)
  const {handleSubmit, register, control, formState:{errors}} = useForm({resolver: yupResolver(loginSchema)})
  const navigate = useNavigate()
  const request = async user=>{
    client.post('/user/login',user,{withCredentials:true})
    .then(response=>{
      if(response.status === 200){
        navigate('/dashboard')
      } 
      else setAlertModal(true)
    })
    .catch(error=>console.error(error))
  }
  const emailErr = errors.email
  const passErr = errors.pass
    return(
      <>
      <div className="flex justify-center items-center">
        {alertModal && 
          <Alert color="failure" className="h-min" onDismiss={() => setAlertModal(false)}>
            <span className="font-medium">Incorrect Email/Password.</span> Please try again.
          </Alert>
        }
        <form className="flex container w-64 p-5 flex-wrap rounded-md flex-col gap-4 border-accent/20 border-b-2 bg-secondary/30" onSubmit={handleSubmit(request)}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" 
              placeholder="name@domain.com" 
              {...register('email')} 
              color={errors.email ? 'failure' : ''}
              helperText={
                  <>
                      {errors.email ? errors.email.message : ''}
                  </>
              }
              />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput 
            id="password1" 
            type="password" 
            {...register('password')} 
            helperText={
              <>
                  {errors.password ? errors.password.message : ''}
              </>
          }
          />
          </div>
          <div className="flex items-center gap-2">
          </div>
          <Button type="submit" className="text-text border-b-2 border-accent/20 rounded-md bg-primary">Submit</Button>
        </form>
      </div>
      </>
    )
}

export default loginForm