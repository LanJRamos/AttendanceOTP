import { Table } from "flowbite-react";
import client from "../axiosURL";
import {useState,useEffect} from 'react'

function LogTable({setLogList}){
    const [logs,setLogs] = useState([])
    useEffect(()=>{
        // client.get(`logs/all`)
        // .then(res=>setLogs(res.data))
        // .then(err=>console.log(err))
        setLogs(
            [
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
                {logID:1,generatedBy:'Lance B Ramos',changesDesc:'Created Shift Row at 2023-12-07'},
            ]
            )
    },[],)
    return(
        <div className='overflow-y-auto max-h-[90vh] w-full'>
            <Table className="table-auto"hoverable>
                <Table.Head>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell>Logs</Table.HeadCell>
                    <Table.HeadCell>Change Description</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        logs.map((Log,ndx)=>
                            <LogBody key={ndx} id = {Log.logID} emp= {Log.generatedBy} desc={Log.changesDesc}/>
                        )
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

const LogBody = ({setLogList,id,emp,desc})=>{
    const checkHandler = ()=>{
        setLogList(list=>{
            console.log(list)
            if(list.includes(id)) return list.filter(val=>val!==id)
            return [...list,id]
        })
    }
    return(
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell></Table.Cell>
            <Table.Cell className="text-black">{emp}</Table.Cell>
            <Table.Cell className="text-black">{desc}</Table.Cell>
        </Table.Row>
    )
}

export default LogTable
