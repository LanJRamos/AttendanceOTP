import { Controller } from 'react-hook-form';
import { TextInput, Datepicker, Label, Select } from 'flowbite-react'


export const ProfileSection = ({ register, control, errors , editData }) => {
    const employeeErr = errors.employee;
    return (
        <>
            <Label htmlFor="firstName1" value="First Name" />
            <TextInput
                id='firstName1'
                {...register('employee.firstName')}
                color={employeeErr?.firstName ? 'failure' : ''}
                helperText={<>
                    {employeeErr?.firstName ? employeeErr?.firstName.message : ''}
                </>}
            />
            <Label htmlFor="middleName1" value="Middle Name" />
            <TextInput
                id='middleName1'
                {...register('employee.middleName')}
                color={employeeErr?.middleName ? 'failure' : ''}
                helperText={<>
                    {employeeErr?.middleName ? employeeErr?.middleName.message : ''}
                </>} />
            <Label htmlFor="lastName1" value="Last Name" />
            <TextInput
                id='lastName1'
                {...register('employee.lastName')}
                color={employeeErr?.lastName ? 'failure' : ''}
                helperText={<>
                    {employeeErr?.lastName ? employeeErr?.lastName.message : ''}
                </>} />
            <Label htmlFor="gender1" value="Gender" />
            <Select id="gender1"
                {...register('employee.gender')}
                color={employeeErr?.gender ? 'failure' : ''}
                helperText={<>
                    {employeeErr?.gender ? employeeErr?.gender.message : ''}
                </>}
            >
                <option>--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Select>
            <Label htmlFor="civilStatus1" value="Civil Status" />
            <Select id="civilStatus1"
                {...register('employee.civilStatus')}
                color={employeeErr?.civilStatus ? 'failure' : ''}
                helperText={<>
                    {employeeErr?.civilStatus ? employeeErr?.civilStatus.message : ''}
                </>}
            >
                <option className='color-gray-500'>--</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="legally separated">Legally Separated</option>
            </Select>
            <Label htmlFor="birthDate1" value="Birth Date" />
            <Controller
                name='employee.birthDate'
                control={control}
                color={employeeErr?.birthDate ? 'failure' : ''}
                helperText={<>
                    {employeeErr?.birthDate ? employeeErr?.birthDate.message : ''}
                </>}
                render={({ field: { onChange, value } }) => (<Datepicker
                    id='birthDate1'
                    placeholder='Select Date'
                    selected={value}
                    autoHide={true}
                    onSelectedDateChanged={(date) => onChange(date)} />
                )} />
            {/* <span>{ employeeErr?.birthDate?.message }</span> */}
            <Label htmlFor="jobPosition1" value="Job Position" />
            <TextInput
                id='jobPosition1'
                {...register('employee.jobPosition')}
                color={employeeErr?.jobPosition ? 'failure' : ''}
                helperText={<>
                    {errors?.employee?.jobPosition ? errors?.employee?.jobPosition.message : ''}
                </>} />
        </>
    );
};
