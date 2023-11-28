import UserCreate from "../components/UserCreate"
import CompHeader from "../components/headerAndFooter/Header"
import CompFooter from "../components/headerAndFooter/Footer";

const CreateUser = ()=>{
    return(
        <>
            <CompHeader/>
            <UserCreate/>
            <CompFooter/>
        </>
    )
}

export default CreateUser