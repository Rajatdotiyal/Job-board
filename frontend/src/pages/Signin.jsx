import {useState } from "react"
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLoadingAndErorr from "../hooks/useLoadingAndError";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoading , setIsLoading , error , setError} = useLoadingAndErorr();

    const navigate = useNavigate();

    const handleSignin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("https://job-board-henna-omega.vercel.app/api/v1/user/signin", {
                email: email,
                password: password
            })
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', `Bearer ${token}`)
                navigate('/home');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Sign-in failed')
        } finally {
            setIsLoading(false);
        }
    }


    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    return <>
        <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto min-h-screen p-4">
            <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">

                <Sidebar
                    heading1="Sign In to Your Account"
                    heading2="Quick & Secure Login"
                    para1="Welcome back! Access your account and continue your journey with us."
                    para2="Our sign-in process is fast and secure, ensuring your privacy and protecting your data every step of the way."
                />

                {isLoading ? (
                    <p>Signing in....</p>
                ) : (
                    <div className="md:col-span-2 w-full py-6 px-6 sm:px-16">

                        {/* Error message container */}
                        <div className="py-4 mb-4 text-sm text-red-800 rounded-lg min-h-[60px]" role="alert">
                            {error && <p className="text-red-500">{error}</p>}
                        </div>

                        <form>
                            <Topbar value="Signin to account" />

                            <div className="space-y-6">
                                <div>
                                    <Inputbox type="email" value="Email" placeholder="JohnDoe@gmail.com" onChange={onChangeEmailHandler} />
                                </div>
                                <div>
                                    <Inputbox type="password" value="Password" placeholder="123456" onChange={onChangePasswordHandler} />
                                </div>
                            </div>

                            <Button
                                value1="Login to account"
                                value2="Don't have an account?"
                                value3="Signup here"
                                to="/Signup"
                                onClick={handleSignin}
                            />
                        </form>
                    </div>
                )}
            </div>
        </div>

    </>
}