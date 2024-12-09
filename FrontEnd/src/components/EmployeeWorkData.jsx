import { Table, TableHeadCell } from "flowbite-react"
import { useState, useEffect} from 'react'
const EmployeeStatus = () =>{

    const [data,setData] = useState([]);

    useEffect()


    return(
        <>
        <div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>
                        Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Work Hours
                    </Table.HeadCell>
                    <Table.HeadCell>
                        OvertimeHours
                    </Table.HeadCell>
                    <Table.HeadCell>
                        No. of Absences
                    </Table.HeadCell>
                    <Table.HeadCell>
                        No of Lates
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {/* loop body here */}
                </Table.Body>
            </Table>
        </div>
        </>
    )
}

const Rows = ({id, TotalHours, OvertimeHours, Absences, Lates})=>{

    return(
        <Table.Row>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{TotalHours}</Table.Cell>
            <Table.Cell>{OvertimeHours}</Table.Cell>
            <Table.Cell>{Absences}</Table.Cell>
            <Table.Cell>{Lates}</Table.Cell>
        </Table.Row>
    )
}

export default EmployeeStatus