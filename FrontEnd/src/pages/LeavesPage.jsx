import LeavesCalendar from '../components/LeavesCalendar'
import LeaveTable from '../components/LeavesTable'
import {useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import {Button, TextInput} from 'flowbite-react'
import client from '../axiosURL'
import SearchInput from '../components/SearchBar'

const LeavesPage = ()=>{
    const [leaves,setLeaves] = useState()
    const [leaveDays,setLeaveDays] = useState([])
    const [selected,select] = useState(null)
    const [employeeID,setEmployeeID] = useState(null)
    const [options,setOptions] = useState([])
    const fields = useForm()
    const submission = result=>{
        const format = {
            reason:result.reason,
            leaveDays: {
                empID : employeeID,
                id: selected.leaveDaysID,
                dates: result.dates
            }
        }
        console.log(format)
        client.post('/leavedays/use',format)
        .then(({data})=>console.log(data))
    }
    useEffect(()=>{
        client.get('leaves/all')
        .then(response=>setLeaves(response.data))
    },[])
    
    useEffect(()=>{
        if(employeeID)
        client.get(`leavedays/employee/${employeeID}`)
        .then(({data})=>setLeaveDays(data))
    },[employeeID])

    return(
        <>
        <div>
            <form onSubmit={fields.handleSubmit(submission)} className="overflow-y-auto max-h-[90vh] w-full" >
                <LeaveTable selected={selected} select={select} leaves={leaves} leaveDays={leaveDays}/>
                <LeavesCalendar fields={fields}/>
                <SearchInput fields={fields} setOptions={setOptions} options={options} setEmployeeID={setEmployeeID}/>
                <TextInput {...fields.register('reason')}/>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
            <DevTool control={fields.control}/>
        </>
    )
}

export default LeavesPage