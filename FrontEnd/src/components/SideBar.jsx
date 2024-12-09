'use strict'
import { useState } from 'react';
import { Sidebar, SidebarItemGroup } from "flowbite-react"
import { FaUser, FaCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdDashboard, MdEditCalendar } from "react-icons/md"
import { Routes as Routers, Link, Route } from "react-router-dom";
import { CgDebug } from "react-icons/cg"
import { CiViewList } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { useOutletContext } from 'react-router-dom'
import client from '../axiosURL';

function WebSideBar() {
    const [close, setClose] = useState(true);
    const [ auth ] = useOutletContext()
    if(auth.position === "Admin"){
        return (
            <div className="flex flex-col w-max">
                <button className='flex justify-center' onClick={() => setClose(!close)}><IoMenu size={30}/></button>
                <Sidebar collapsed={close}>
                    <Sidebar.Items>
                        <SidebarItemGroup>
                            <Link to="/dashboard" relative="path">
                                <Sidebar.Item icon={MdDashboard}>
                                    Dashboard
                                </Sidebar.Item>
                            </Link>
                            <Link to="employee" relative="path">
                                <Sidebar.Item icon={FaUser}>
                                    Employees
                                </Sidebar.Item>
                            </Link>
                            <Link to="shift" relative="path">
                                <Sidebar.Item icon={MdEditCalendar}>
                                    Shifts
                                </Sidebar.Item>
                            </Link>
                            <Link to="leaves" relative="path">
                                <Sidebar.Item icon={BsFillBriefcaseFill}>
                                    Leaves
                                </Sidebar.Item>
                            </Link>
                            <Link to="holidayTable">
                                <Sidebar.Item icon={FaCalendarAlt}>
                                    Holidays
                                </Sidebar.Item>
                            </Link>
                            <Link to="createuser" relative="path">
                                <Sidebar.Item icon={FaRegUserCircle}>
                                    Create User
                                </Sidebar.Item>
                            </Link>
                            <Link to="debug" relative="path">
                                <Sidebar.Item icon={CgDebug}>
                                    Debugging
                                </Sidebar.Item>
                            </Link>
                            <Link to="logs" relative="path">
                                <Sidebar.Item icon={CiViewList}>
                                    Logs
                                </Sidebar.Item>
                            </Link>
                        </SidebarItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        )
    } else if(auth.position === "Management"){
        return (
            <div className="flex flex-col w-max">
                <button className='flex justify-center' onClick={() => setClose(!close)}><IoMenu size={30}/></button>
                <Sidebar collapsed={close}>
                    <Sidebar.Items>
                        <SidebarItemGroup>
                            <Link to="/dashboard" relative="path">
                                <Sidebar.Item icon={MdDashboard}>
                                    Dashboard
                                </Sidebar.Item>
                            </Link>
                            <Link to="employee" relative="path">
                                <Sidebar.Item icon={FaUser}>
                                    Employees
                                </Sidebar.Item>
                            </Link>
                            <Link to="shift" relative="path">
                                <Sidebar.Item icon={MdEditCalendar}>
                                    Shifts
                                </Sidebar.Item>
                            </Link>
                            <Link to="leaves" relative="path">
                                <Sidebar.Item icon={BsFillBriefcaseFill}>
                                    Leaves
                                </Sidebar.Item>
                            </Link>
                            <Link to="holidayTable">
                                <Sidebar.Item icon={FaCalendarAlt}>
                                    Holidays
                                </Sidebar.Item>
                            </Link>
                        </SidebarItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        )
    }

}

export default WebSideBar