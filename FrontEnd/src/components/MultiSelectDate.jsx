import DatePicker,{DateObject} from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import TimeRange from './TimeRange'
import Icon from 'react-multi-date-picker/components/icon'
import {useRef,useEffect,useState} from 'react'
import client from '../axiosURL'

const MultiDatePicker = ({onChange,value,employees,register})=>{
    const date = new DateObject()
    const nextMonth = new DateObject()
    const [shifts,setShifts] = useState()
    const [holidays,setHolidays] = useState()
    const openCalendar = useRef()
    useEffect(()=>{
        // openCalendar.current.openCalendar()
        client.get('/holidays/month')
        .then(response=>setHolidays(response.data))
    },[])
    useEffect(()=>{
        client.post('shift/conflict',employees)
        .then(response=>{
            setShifts(response.data)
        })
    },[employees])
    return(
        <DatePicker 
            multiple
            ref={openCalendar}
            mapDays={({date,selectedDate,isSameDate})=>{
                const props = {}
                let holidayDates = holidays?.map(a=>new DateObject(new Date(a.holidayDate)))
                let shiftDates = shifts?.map(a=>new DateObject(new Date(a.shiftDate)))
                let conflict = shiftDates?.filter(a=>selectedDate.some(b=> isSameDate(a,b)))
                if(conflict.length && conflict.some(a=>isSameDate(a,date))){
                    props.className = "highlight highlight-red"
                    props.title = "Conflicting Shift"
                }
                else if(shiftDates?.some(a=> isSameDate(a,date))){
                    props.style = { backgroundColor: "#FFA500"}
                    props.title = "Existing Shift"
                }
                if (holidayDates?.some(a=> isSameDate(a,date))){
                    props.disabled = true
                    props.style = { color: "#ccc", backgroundColor: "#800080" }
                    props.title = "Holiday"
                }
                return props
              }}
            onChange={onChange}
            value={value}
            minDate={date.setDay(1)}
            maxDate={nextMonth.add(1,'month').add(nextMonth.daysLeft,'days')}
            plugins={[
                <DatePanel
                markFocused
                removeButton={false}
                />
            ]}
            render={<Icon/>}
        >
            <TimeRange register={register}/>
        </DatePicker>
    )
}

export default MultiDatePicker