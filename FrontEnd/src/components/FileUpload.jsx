import {FileInput} from 'flowbite-react'

const FileUpload = ()=>{
    return(
        <div id="fileUpload" className="max-w-md">
            <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput 
                id="file" 
                {...register('employee.profileImage')}
                onChange={e=>setFile(URL.createObjectURL(e.target.files[0]))}
                color={employeeErr?.profileImage ? 'failure' : ''}
                helperText="Requirement: 2mb Max Size, 600x600, .jpg, .jpeg, .png file format" />
                {file && <img src={file} alt='Preview'/>}
        </div>
    )
}