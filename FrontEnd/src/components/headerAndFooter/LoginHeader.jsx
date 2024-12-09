'use client';

import logo from '../../assets/TFIicon.png'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import {memo} from 'react'
import LogoutButton from '../LogoutButton';

function header() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/dashboard">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="TFI Logo" />
        <span className="self-center whitespace-nowrap text-xl ">Tenessee Feedmill Inc.</span>
      </Navbar.Brand>
      <div className="flex md:order-2 flex-wrap gap-2">
        <Button color = "green" pill>Settings</Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default memo(header)