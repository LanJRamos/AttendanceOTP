import LoginForm from "../components/LoginForm";
import CompHeader from "../components/headerAndFooter/LoginHeader"
import CompFooter from "../components/headerAndFooter/Footer";

const loginPage = ()=>{

    return(
        <>
            <div className="grid h-screen grid-rows-3 m-0 p-0 ">
                <CompHeader/>
                <LoginForm/>
                <CompFooter/>
            </div>
        </>
    )
}

export default loginPage