import { TextInput, Label, FileInput } from 'flowbite-react';
import { useState } from 'react';
import { HiMail } from 'react-icons/hi'

export const ContactPortion = ({ register, errors }) => {
    const employeeErr = errors.employee;
    const [file, setFile] = useState();


    
    return (
        <>
            <Label htmlFor="contactNumber1" value="Contact Number" />
            <TextInput
                id='contactNumber1'
                type='text'
                {...register('employee.contactNumber')}
                color={employeeErr?.contactNumber ? 'failure' : ''}
                helperText={<>
                    {employeeErr?.contactNumber ? employeeErr?.contactNumber.message : ''}
                </>} />
            <Label htmlFor="email1" value="Email (Optional)" />
            <TextInput
                id='email1'
                icon={HiMail}
                {...register('employee.email')}
                color={employeeErr?.email ? 'failure' : ''}
                helperText={<>
                    {employeeErr?.email ? employeeErr?.email.message : ''}
                </>} />
            <div id="fileUpload" className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="file" value="Upload file" />
                </div>
                <FileInput
                    id="file"
                    accept='image/jpeg, image/png, image/jpg'
                    {...register('profileImage')}
                    onChange={({ target: { files } }) => setFile(URL.createObjectURL(files[0]))}
                    color={errors?.profileImage ? 'failure' : ''}
                    helperText={errors?.profileImage ? errors.profileImage.message : "Requirement: 2mb Max Size, 600x600, .jpg, .jpeg, .png file format"} />
                {file && !errors?.profileImage && <img src={file} alt='Preview' />}
            </div>
        </>
    );
};
