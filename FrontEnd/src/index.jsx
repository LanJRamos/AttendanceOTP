import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UserCreate from './components/UserCreate'
import EmployeeRegisterForm from './components/EmployeeRegister'
import LeaveTable from './components/LeavesTable'
import HolidayTable from './components/HolidayTable'
import EmployeeTable from './components/EmployeeTable'
import LogTable from './components/LogsTable'
import LeavesPage from './pages/LeavesPage'
import TimeInOut from './components/TimeInOut'
import ShiftPage from './pages/ShiftPage'
import client from './axiosURL'
import EditEmployeeForm from './components/EditEmployeeData'
import EmployeeTabs from './components/EmployeeTabs'
import LeaveTabs from './components/LeaveTabs'
import HolidayTabs from './components/HolidayTabs'
import IndexPage from './pages/IndexPage'
import HolidayForm from './components/HolidayForm'
// import Debug from './components/debug'

const index = ()=>{
    return(
        <Router>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<EditEmployeeForm/>} path='/editemployee'/>
                    <Route element={<EmployeeRegisterForm/>} path='/createemployee'/>
                    <Route element={<LeaveTable/>} path='/leaves'/>
                    <Route element={<Dashboard/>} path='/dashboard'>
                        <Route index element={<IndexPage/>} />
                        <Route element={<EmployeeTabs/>} path='/dashboard/employee'/>
                        <Route element={<ShiftPage/>} path='/dashboard/shift'/>
                        <Route element={<HolidayTabs/>} path='/dashboard/holidayTable'/>
                        <Route element={<LeaveTabs/>} path='/dashboard/leaves'/>
                        <Route element={<UserCreate/>} path='/dashboard/createuser'/>
                        <Route element={<LogTable/>} path='/dashboard/logs'/>
                        <Route element={<TimeInOut/>} path='/dashboard/debug'/>
                        <Route element={<EditEmployeeForm/>} path='/dashboard/editEmployeeData/:id'/>
                    </Route>
                </Route>
                <Route path='/holidayform' element={<HolidayForm/>}/>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/usercreate' element={<UserCreate/>}></Route>
            </Routes>
        </Router>
    )
}

const PrivateRoutes = ({children, ...rest})=>{
    const [auth,setAuth] = useState(null)
    useEffect(()=>{
        client.get('/user/auth')
        .then(({data})=>setAuth(data))
    },[])
    if(!auth) return("loading")
    return(
         auth.valid ? <Outlet context={[auth]}/> : <Navigate to='/login'/>
    )
}

export default index