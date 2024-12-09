'use client';

import logo from '../../assets/TFIicon.png'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import {memo} from 'react'
import LogoutButton from '../LogoutButton';

function header() {
  return (
    <Navbar fluid rounded className='bg-emerald-100'>
      <Navbar.Brand href="/dashboard">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="TFI Logo" />
        <span className="self-center whitespace-nowrap text-xl ">Tenessee Feedmill Inc.</span>
      </Navbar.Brand>
      <div className="flex md:order-2 flex-wrap gap-2">
        {/* <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown> */}
        <Button color = "green" pill>Settings</Button>
        {/* <Button color = "red" pill>Log Out</Button> */}
        <LogoutButton/>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default memo(header)