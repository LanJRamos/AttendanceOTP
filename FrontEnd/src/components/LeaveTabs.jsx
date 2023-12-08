import { Tabs } from "flowbite-react";
import LeavesPage from "../pages/LeavesPage";
import { FcLeave } from "react-icons/fc";
import LeaveTable from "./LeavesTable";
import LeaveForm from "./LeavesForm";

const LeaveTabs = ()=>{
    
    return(
    <div className="overflow-y-auto max-h-[90vh] w-full">
    <Tabs>
        <Tabs.Item title ="Leaves" icon ={FcLeave}>
            <LeavesPage/>
        </Tabs.Item>
        <Tabs.Item title ="Form">
            {/* <LeaveForm/> */}
        </Tabs.Item>
    </Tabs>
    </div>
    )
}

export default LeaveTabs