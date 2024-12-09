import DrawGraph from "../components/DrawGraph";
import PendingList from "../components/PendingModal";
import {useState, useEffect} from 'react'
import {Card,Button} from 'flowbite-react'
import {Navigate} from 'react-router-dom'
import client from '../axiosURL'

const IndexPage = ()=>{
    const [values,setValues] = useState({})
    useEffect(()=>{
        client.get(`employee/hours`)
        .then(({data})=>{
            let values = {
                hours: 0,
                overtime: 0,
                absent: 0,
                late: 0
            }
            data.map(a=>{
                values.hours += Number(a.workHours)
                values.overtime += Number(a.overtimeHours)
                values.absent += a.absentCount
                values.late += a.lateCount
            })
            setValues(values)
        })
    },[])
    return(
        <>
        <div className="grid relative grid-cols-2 grid-flow-row-dense gap-1">
            <GraphHours />
            <Sessions />
            <InfoCard values={values}/>
            <TotalHours values={values}/>
        </div>
        </>
    )
}

const GraphHours = () => {
    return(
        <Card className="h-[40vh] w-max absolute bottom-[52%] right-[52%]">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
                Graph of Total Hours
            </h5>
                <DrawGraph/>
        </Card>
    )
}

const InfoCard = ({values})=>{
    const [nav,setNav] = useState(false)
    return(
        <Card className="h-max w-max absolute top-[52%] right-[52%] bg-red-100">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total Absents : {values.absent}
        </h5>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total Lates : {values.late}
        </h5>
        {nav && <Navigate to='/dashboard/employee'/>}
        <Button onClick={()=>setNav(true)}>
            Read more
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
            </svg>
            
        </Button>
        </Card>
    )
}

const Sessions = () => {
    return(
        <Card className="h-max absolute bottom-[52%] left-[52%] w-max bg-green-50">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Pending Sessions : 0
            </h5>
            <PendingList />
        </Card>
    )
}

const TotalHours = ({values}) => {
    console.log(values)
    return(
        <Card className="h-min absolute top-[52%] left-[52%] w-max">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Hours : {values.hours}
            </h5>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Overtime Hours : {values.overtime}
            </h5>
        </Card>
    )
}

export default IndexPage