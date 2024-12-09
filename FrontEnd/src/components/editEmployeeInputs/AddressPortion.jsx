import { TextInput, Label } from 'flowbite-react';
import { LuMapPin } from "react-icons/lu";
import { useState } from 'react';


export const AddressPortion = ({ register, errors, address }) => {
    const addressErr = errors.address;
    const [postal, setPostal] = useState('');
    
    return (
        <>
            <Label htmlFor="street1" value="Street" />
            <TextInput
                id='street1'
                {...register('address.street')}
                color={addressErr?.street ? 'failure' : ''}
                placeholder={address.street}
                helperText={<>
                    {addressErr?.street ? addressErr?.street.message : ''}
                </>}
            />
            <Label htmlFor="barangay1" value="Barangay" />
            <TextInput
                id='barangay1'
                {...register('address.barangay')}
                color={addressErr?.barangay ? 'failure' : ''}
                placeholder={address.barangay}
                helperText={<>
                    {addressErr?.barangay ? addressErr?.barangay.message : ''}
                </>} 
            />
            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="postalCode1" value="Postal Code (Optional)" />
                </div>
                <TextInput
                    id="postalCode1"
                    type="text"
                    icon={LuMapPin}
                    value={postal}
                    onChange={({ target: { value } }) => setPostal(value.replace(/\D/g, ''))}
                    placeholder='1234'
                    helperText={<>
                        {addressErr?.postalCode ? addressErr?.postalCode.message : ''}
                    </>} 
                />
            </div>
            <Label htmlFor="city_municipality1" value="City/Municipality" />
            <TextInput
                id='city_municipality1'
                {...register('address.city_municipality')}
                color={addressErr?.city_municipality ? 'failure' : ''}
                placeholder={address.city_municipality}
                helperText={<>
                    {addressErr?.city_municipality ? addressErr?.city_municipality.message : ''}
                </>} />
            <Label htmlFor="province1" value="Province" />
            <TextInput
                id='province1'
                {...register('address.province')}
                color={addressErr?.province ? 'failure' : ''}
                placeholder={address.province}
                helperText={<>
                    {addressErr?.province ? addressErr?.province.message : ''}
                </>} 
            />
        </>
    );
};
