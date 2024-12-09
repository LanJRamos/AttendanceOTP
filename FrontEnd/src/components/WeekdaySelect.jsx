import {Checkbox, Label} from 'flowbite-react'

const weekdays = ({register})=>{
    return(
        <div className="flex max-w-md flex-col gap-4" id="checkbox">
            <div className="flex items-center gap-2">
                <Checkbox {...register('weekday.monday')} id="Mon" />
                <Label htmlFor="Mon">Monday</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox {...register('weekday.tuesday')} id="Tue" />
                <Label htmlFor="Tue">Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox {...register('weekday.wednesday')} id="Wed" />
                <Label htmlFor="Wed">Wednesday</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox {...register('weekday.thursday')} id="Thu" />
                <Label htmlFor="Thu">Thursday</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox {...register('weekday.friday')} id="Fri" />
                <Label htmlFor="Fri">Friday</Label>
            </div>
        </div>
    )
}

export default weekdays