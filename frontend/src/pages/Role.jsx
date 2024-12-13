import { useState } from "react";
import NextButton from "../components/NextButton";
import useLoadingAndErorr from "../hooks/useLoadingAndError";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Role() {
    const [selectedRole, setSelectedRole] = useState("Please Select");
    const { isLoading, setIsLoading, error, setError } = useLoadingAndErorr();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const nextButtonHandler = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("https://job-board-henna-omega.vercel.app/api/v1/user/info/role", {
                role: selectedRole
            }, {
                headers: {
                    " Content-Type": "application/json",
                    Authorization: localStorage.getItem('token'),
                }
            })

            if (response.status === 200) {
                if (selectedRole === 'jobseeker') navigate('/jsdetails')
                else if (selectedRole === 'employer') navigate('/empdetails')
            }

        } catch (err) {
            setError(err.response?.data?.msg);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div>
            {isLoading ? (<p>Signing in....</p>) : (

                <div className="font-sans bg-white w-full flex items-center justify-center h-screen p-4">
                    <div className="py-4 mb-4 text-sm text-red-800 rounded-lg min-h-[60px]" role="alert">
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <div className=" p-10 h-3/6 w-4/6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden flex flex-col items-center justify-center">
                        {/* Role Selection */}
                        <div className="w-full mb-8">
                            <label htmlFor="role" className="block text-gray-800 text-sm mb-2">
                                Select Role*
                            </label>
                            <select
                                id="role"
                                value={selectedRole}
                                onChange={handleChange}
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                            >
                                <option value="Please Select" disabled>Please Select </option>
                                <option value="jobseeker">Jobseeker</option>
                                <option value="employer">Employer</option>
                            </select>
                        </div>

                        {/* Next Button */}
                        <NextButton onClick={nextButtonHandler} />
                    </div>
                </div>
            )}
        </div>
    );
}
