import { Button, Card, Label, TextInput, Textarea } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { leaveSchema } from '../yupSchema'
import client from '../axiosURL'

const LeaveForm = ()=>{
    const {register, handleSubmit,formState :{errors},control} = useForm({
        resolver: yupResolver(leaveSchema),
    })

    const onSubmit = (data)=>{
        const {...results} = data
        console.log('Leave Created',results)
        client.post('leaves/create',results)
        .catch(err=>console.log(err))
    }
    return(
        <>
            
            <div className='flex justify-center items-center'>
                <Card className='max-w-sm'>
                    <h1>Create Leave</h1>
                    <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='max-w-md'>
                            <Label htmlFor='leaves' value='Leave'/>
                            <TextInput
                                id="leave"
                                type='text'
                                placeholder='Leave Name'
                                {...register("leaveName")}
                                color={errors.leaveName ? 'failure' : ''}
                                helperText={<>{errors.leaveName? errors.leaveName.message : ''}</>}
                                />
                        </div>
                        <div className='max-w-md'>
                            <Label htmlFor='duration' value='Leave Duration'/>
                            <TextInput
                                id="Duration"
                                type='text'
                                placeholder='Duration'
                                {...register("leaveDuration")}
                                color={errors.leaveDuration ? 'failure' : ''}
                                helperText={<>{errors.leaveDuration? errors.leaveDuration.message : ''}</>}
                                />
                        </div>
                        <Button type='submit'>Create Leave</Button>
                    </form>
                </Card>
            </div>
            
        </>
    )
}

export default LeaveForm