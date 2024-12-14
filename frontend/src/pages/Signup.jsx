import { useState } from "react";
import Inputbox from "../components/Inputbox";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLoadingAndErorr from "../hooks/useLoadingAndError";

export default function Signup() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading , setIsLoading , error , setError} = useLoadingAndErorr();

    const navigate = useNavigate();

    const onChangeFistnameHandler = (e) => {
        setFirstname(e.target.value)
    }
    const onChangeLastnameHandler = (e) => {
        setLastname(e.target.value)
    }
    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const handleSignup = async () => {
        setIsLoading(true);
        setError(null)

        try {

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            })

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', `Bearer ${token}`)
                navigate('/role');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Sign-in failed')
        } finally {
            setIsLoading(false);
        }


    }


    return <>

        <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
            <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
                <Sidebar heading1="Create Your Account" para1="Welcome to our registration page! Get started by creating your account." heading2="Simple & Secure Registration" para2="Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security." />
                {isLoading ? (
                    <p>Signing in...</p>
                ) : (

                    <div className="md:col-span-2 w-full py-6 px-6 sm:px-16">
                        {/* Error message container */}
                        <div className="p-4 pl-16 mb-2 text-sm text-red-800 rounded-lg min-h-[60px]" role="alert">
                            {error && <p className="text-red-500">{error} </p>} 
                        </div >

                        <form className="md:col-span-2 w-full borderpy-6 px-6 sm:px-16">
                            <Topbar value="Create an account" />

                            <div className="space-y-6">

                                <div>

                                    <Inputbox type="text" value="First Name" placeholder="John" onChange={onChangeFistnameHandler} />
                                </div>
                                <div>

                                    <Inputbox type="text" value="Last Name" placeholder="Doe" onChange={onChangeLastnameHandler} />
                                </div>
                                <div>

                                    <Inputbox type="email" value="Email" placeholder="JohnDoe@gmail.com" onChange={onChangeEmailHandler} />
                                </div>
                                <div>

                                    <Inputbox type="password" value="Password" placeholder="123456" onChange={onChangePasswordHandler} />
                                </div>
                            </div>
                            <Button value1="Create an account" value2="Already have an account?" value3="Login here" to="/signin" onClick={handleSignup} />
                        </form>
                    </div>
                )}
            </div>
        </div>

    </>
}