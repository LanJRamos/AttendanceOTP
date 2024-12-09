import EmployeeTable from "../components/EmployeeTable";
import ShiftForm from "../components/ShiftForm";
import {DevTool} from '@hookform/devtools'
import ConflictModal from '../components/ConflictModal'
import client from '../axiosURL'
import {useState,useEffect} from 'react'
import { useForm } from "react-hook-form";

const ShiftPage = ()=>{
    const fields = useForm()
    const [empList, setEmpList] = useState([])
    const [list,setList] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [conflict, setConflict] = useState({});

    useEffect(()=>{
        client.get('shift/count')
        .then(({data})=>{
            setList(data.map(d=>{return {
                id : d.employeeID,
                values : [d.count]
            }}))
        })
    },[])

    const submission = results=>{
        console.log(results)
        results.employees = empList
        results.dates.forEach((date,ndx)=>results.dates[ndx] = date.format('YYYY-MM-DD'))
        client.post('/shift',results)
        .then(response=>{
            if(response.data?.some(d=>d.shiftID)){
                setConflict(response.data)
                setOpenModal(true)
            }else{
                console.log('Shift may be saved?',response)
            }
        })
        .catch(error=>{
            console.error(error)
        })
    }
    return(
        <>
            <div className='overflow-y-auto max-h-full w-full relative'>
                <ConflictModal openModal={openModal} setOpenModal={setOpenModal} conflict={conflict}/>
                <div className="overflow-y-auto max-h-full">
                <EmployeeTable checkBox 
                setter={setEmpList} 
                columns={['Assigned']}
                data={list}
                />
                </div>
            </div>
            <div>
                <form onSubmit={fields.handleSubmit(submission)}>
                    <ShiftForm fields={fields} employees={empList}/>
                </form>
            </div>
            <DevTool control={fields.control}/>
        </>
    )
}

export default ShiftPage