import { Button, Card } from 'flowbite-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import client from '../axiosURL'
import SearchBar from './SearchBar'
import { DevTool } from '@hookform/devtools'

const TimeInOut = () => {
    const [timeMethod,setTimeMethod] = useState('')
    const [employeeID,setEmployeeID] = useState(null)
    const [options,setOptions] = useState([])
    const fields = useForm()
    
    const initTimeIn = ({datetime})=>{
        client.post('daysession/create',{
            daysession:{
                employeeID: employeeID,
                timeIn: datetime.format()
            }
        })
        .then(console.log)
    }
    const initTimeOut = ({datetime})=>{
        client.post('daysession/create',{
            daysession:{
                employeeID: employeeID,
                timeOut: datetime.format()
            }
        })
        .then(console.log)
    }

    const submission = results=>{
        timeMethod === 'TimeIn' ? initTimeIn(results) : initTimeOut(results)
    }

    return(
        <Card className='h-max border-b-neutral-400'>
            <div className="flex justify-center items-center">
                <div className='md-2 block'>
                    <h1>Time-In & Time-Out System</h1>
                    <form onSubmit={fields.handleSubmit(submission)}>
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

                        <SearchBar fields={fields} setOptions={setOptions} options={options} setEmployeeID={setEmployeeID}/>
                        <Button color='green' type='submit' onClick={ () => setTimeMethod('TimeIn') }>Time-In</Button> 
                        <Button color='red' type='submit' onClick={ () => setTimeMethod('TimeOut') }>Time-Out</Button>
                    </form>
                    <DevTool control={fields.control}/>
                </div>
            </div>
        </Card>
    )
}

export default TimeInOut