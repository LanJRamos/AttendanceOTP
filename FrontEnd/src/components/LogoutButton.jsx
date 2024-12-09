import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import client from '../axiosURL'

const LogoutButton = ()=>{
    const logout = ()=>{
        client.get('user/logout')
        .then(console.log)
    }
    return(
        <Link to='/login' onClick={()=>logout()}>
            <Button color="Red">Log Out</Button>
        </Link>
    )
}

export default LogoutButton