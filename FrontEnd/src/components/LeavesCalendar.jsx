import DatePicker,{DateObject} from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import Icon from 'react-multi-date-picker/components/icon'
import {Controller} from 'react-hook-form'

const LeavesCalendar = ({fields})=>{
    const date = new DateObject()
    return(
        <Controller 
            control={fields.control}
            name = 'dates'
            render={({field:{onChange,value},formState:{errors}})=>
                <DatePicker 
                    multiple
                    onChange={onChange}
                    value={value}
                    minDate={date.setDay(1)}
                    plugins={[
                        <DatePanel
                        markFocused
                        removeButton={false}
                        />
                    ]}
                    render={<Icon/>}
                />
            }
        />
    )
}

export default LeavesCalendar