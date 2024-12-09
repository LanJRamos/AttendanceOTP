import {Controller} from 'react-hook-form'
import Select from 'react-select'
import client from '../axiosURL'

const SearchInput = ({fields,options,setOptions,setEmployeeID})=>{
    const debounce = (callback,delay)=>{
        let timer
        return (...args)=>{
            clearTimeout(timer)
            timer = setTimeout(()=>{
                callback(...args)
            },delay)
        }
    }
    const inputChange = debounce(input=>{
        if(input === '') return
        client.get(`employee/name?input=${input}`)
        .then(({data})=>setOptions(data.map(employee=>{
            return {
                value: employee.employeeID,
                label: employee.fullName
            }
        })))
    },1000)
    const select = input=>{
        setEmployeeID(input.value)
    }
    return(
        <Controller
            control={fields.control}
            name='searchBar'
            render={({field})=>(
                <Select 
                    {...field}
                    options={options}
                    onInputChange={inputChange}
                    onChange={select}
                />
            )}
        />
    )
}

export default SearchInput