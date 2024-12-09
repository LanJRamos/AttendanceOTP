import {Button, Modal, Table, TextInput, Select} from 'flowbite-react'
import {useState,useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import client from '../axiosURL'

const PendingList = ()=>{
    const [display,setDisplay] = useState(false)
    const [resolve,setResolve] = useState(false)
    const [pend,setPend] = useState({})
    const [pendings,setPendings] = useState([])
    useEffect(()=>{
        client.get('daysession/pending')
        .then(({data})=>setPendings(data))
    },[])
    return(
        <>
            <Button disabled onClick={()=>setDisplay(true)}></Button>
            <Modal show={display} onClose={() => setDisplay(false)}>
                <Modal.Header>Unresolved Sessions</Modal.Header>
                <Modal.Body>
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.HeadCell>Employee</Table.HeadCell>
                                <Table.HeadCell>Date</Table.HeadCell>
                                <Table.HeadCell>Resolve</Table.HeadCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {
                                pendings?.map(pending=>(
                                    <>
                                        <Table.Row>
                                            <Table.Cell>{pending.fullName}</Table.Cell>
                                            <Table.Cell>{pending.timeIn}</Table.Cell>
                                            <Table.Cell><Button onClick={()=>{setResolve(true);setPend(pending)}}/></Table.Cell>
                                        </Table.Row>
                                    </>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </Modal.Body>
            </Modal>
            <ResolutionModal resolve={resolve} setResolve={setResolve} pending={pend}/>
        </>
    )
}

const ResolutionModal = ({resolve,setResolve,pending})=>{
    const fields = useForm()
    return(
        <Modal show={resolve} onClose={()=>setResolve(false)}>
            <Modal.Header>Resolve : {pending.fullName}</Modal.Header>
            <Modal.Body>
                <form>
                    <Select>
                        <option>Late</option>
                        <option>Present</option>
                        <option>Paid Leave</option>
                        <option>Non-Work</option>
                        <option>Excused</option>
                    </Select>
                    <Controller 
                            control={fields.control}
                            name='datetime'
                            render={({field:{value,onChange}})=>(
                                <DatePicker 
                                    disableDayPicker
                                    value={value}
                                    onChange={onChange}
                                    format='YYYY-MM-DD HH:mm:ss'
                                    plugins={[
                                        <TimePicker 
                                            hideSeconds
                                        />
                                    ]}
                                    render={(value,openCalendar)=><Button onClick={openCalendar}>{value ? value : 'Select Time'}</Button>}
                                />
                            )}
                        />
                    <TextInput placeholder="Reason"/>
                    <Button type='submit'>Submit</Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default PendingList