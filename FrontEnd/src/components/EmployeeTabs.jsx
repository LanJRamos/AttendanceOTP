'use strict'
import { Tabs } from "flowbite-react"
import EmployeeRegisterForm from "./EmployeeRegister"
import EmployeeTable from "./EmployeeTable"
import { FaClipboardList , FaUserPlus } from "react-icons/fa";
import {useEffect,useState} from 'react'
import client from '../axiosURL'
import { useOutletContext } from 'react-router-dom'

const EmployeeTabs = ()=>{
    const [list,setList] = useState([])
    const [ auth ] = useOutletContext()
    useEffect(()=>{
        client.get('employee/hours')
        .then(({data})=>{
            setList(data.map(a=>{return {id:a.employeeID,values:[a.workHours,a.overtimeHours,a.absentCount,a.lateCount]}}))
        })
    },[])
    return(
        <div className='overflow-y-auto h-screen w-full'>
            <Tabs>
                <Tabs.Item title ="List" icon={FaClipboardList}>
                    <EmployeeTable editable={auth?.position === 'Admin'} columns={['Total Hours','Overtime','Absents','Lates']} data={list}/>
                </Tabs.Item>
                {<Tabs.Item title="Create Employee" icon={FaUserPlus}>
                    <EmployeeRegisterForm/>
                </Tabs.Item>}
            </Tabs>
        </div>
    )
}

export default EmployeeTabs