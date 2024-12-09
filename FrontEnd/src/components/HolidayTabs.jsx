import { Tabs } from "flowbite-react";
import HolidayTable from "./HolidayTable";
import HolidayForm from "./HolidayForm";
import { MdEventNote } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";
import {useOutletContext} from 'react-router-dom'


const HolidayTabs = ()=>{
    const [ auth ] = useOutletContext()

    return(
        <>
            <div className='overflow-y-auto max-h-[90vh] w-full'>
                <Tabs>
                    <Tabs.Item title ="Holiday Tabs" icon={MdEventNote}>
                        <HolidayTable editable={auth.position === 'Admin'}/>
                    </Tabs.Item>
                    {auth.position === 'Admin' && <Tabs.Item title = "Form" icon={IoCreateSharp}>
                        <HolidayForm/>
                    </Tabs.Item>}
                </Tabs>
            </div>
        </>
    )
}
export default HolidayTabs