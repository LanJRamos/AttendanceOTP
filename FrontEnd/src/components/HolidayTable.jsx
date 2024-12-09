import client from '../axiosURL'
import {Table, Button} from "flowbite-react"
import {useState,useEffect} from 'react'
import { FaEdit } from "react-icons/fa"

function HolidayTable({editable}){
    const [holidays,setHolidays] = useState([])
    useEffect(()=>{
        client.get(`holidays/all`)
        .then(res=>setHolidays(res.data))
        .catch(err=>console.log(err))
    },[])
    return(
        <div className='overflow-y-auto max-h-[90vh] w-full'>
            <Table className="table-auto"hoverable>
                <Table.Head>
                    <Table.HeadCell>Holiday Name</Table.HeadCell>
                    <Table.HeadCell>Holiday Date</Table.HeadCell>
                    {editable && <Table.HeadCell><span className="sr-only">Edit</span></Table.HeadCell>}
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                    holidays.map((holiday,ndx)=>
                        <HolidayTableBody key={ndx} 
                        id={holiday.holidayID} 
                        name={holiday.holidayName} 
                        editable={editable}
                        date={new Date(holiday.holidayDate).toDateString()}/>
                    )
                    }
                </Table.Body>
            </Table>
    </div>
    )
}

const HolidayTableBody = ({name,date,editable})=>{
    return(
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className ="whitespace-nowrap font-medium text-gray-900 dark:text-white py-2">{name}</Table.Cell>
            <Table.Cell className= "py-0">{date}</Table.Cell>
            {editable && <Table.Cell className= "py-0"><Button className="border-2 border-accent/50"><FaEdit/></Button></Table.Cell>}
        </Table.Row>
    )
}

export default HolidayTable