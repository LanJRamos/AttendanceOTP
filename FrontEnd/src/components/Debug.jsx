import EmployeeTable from "./EmployeeTable"
import TimeInOut from "./TimeInOut"

const debug = () => {
    return(
        <>
            <div className="grid grid-flow-col auto-cols-max">
                {/* <EmployeeTable/> */}
                <TimeInOut/>
            </div>
        </>
    )
}

export default debug