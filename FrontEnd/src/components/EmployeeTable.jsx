import {Table, Button, Checkbox} from 'flowbite-react'
import { FaUserEdit } from "react-icons/fa";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import client from '../axiosURL'

const EmployeeTable = ({setter,columns,data,checkBox,editable})=>{
    columns = columns ?? ['Placeholder']
    const [employees,setEmployees] = useState([])

    useEffect(()=>{
        client.get(`employee/all`)
        .then(res => setEmployees(res.data))
        .catch(err => console.log(err))
        console.log(data)
    },[])

    return(
        <div className='overflow-y-auto h-[70vh] w-full'>
            <Table className='table-auto' hoverable>
                <Table.Head>
                    {checkBox && <Table.HeadCell>Select</Table.HeadCell>}
                    <Table.HeadCell>Name</Table.HeadCell>
                    {
                        columns.map((col,ndx)=>{
                            return <Table.HeadCell key={ndx}>{col}</Table.HeadCell>
                        })
                    }
                    {editable && <Table.HeadCell></Table.HeadCell>}
                </Table.Head>
                <Table.Body className='divide-y'>
                    {
                        employees.map((emp,ndx)=>
                            <TableRow className key={ndx} 
                            id={emp.employeeID} name={emp.fullName} 
                            setEmpList={setter} checkBox={checkBox} 
                            data={data.find(a=>a.id === emp.employeeID)?.values}
                            editable={editable}
                            empty={columns.map(()=>'--')}/>
                        )
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

const TableRow = ({setEmpList,id,name,checkBox,data,empty,editable})=>{
    data = data ?? empty
    const checkHandler = ()=>{
        setEmpList(list=>{
            if(list.includes(id)) return list.filter(val=>val !== id)
            return [...list,id]
        })
    }
    return(
        <>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            {checkBox && <Table.Cell><Checkbox onChange={()=>checkHandler()}/></Table.Cell>}
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white py-0">
                {name}
            </Table.Cell>
            {data?.map(a=>(
                <Table.Cell className='py-0'>{a}</Table.Cell>
            ))}
            {editable && <Table.Cell className='py-0'>
                <Link to={`/dashboard/editEmployeeData/${id}`}>
                    <Button className='border-2 border-accent/50'>
                        <FaUserEdit className="ml-1 h-5 w-5" fill='black'/>
                    </Button>
                </Link>
            </Table.Cell>}
        </Table.Row>
        </>
    )
}

export default EmployeeTable