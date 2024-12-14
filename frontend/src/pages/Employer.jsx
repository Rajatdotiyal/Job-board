import { useState } from "react";
import useLoadingAndErorr from "../hooks/useLoadingAndError";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/NextButton";
import Inputbox from "../components/Inputbox";
import axios from "axios";

export default function Employer() {
    const [compName, setCompName] = useState("");
    const [compSize, setCompSize] = useState("");
    const [industry, setIndustry] = useState("");
    const [website, setWebsite] = useState("");
    const { isLoading, setIsLoading, error, setError } = useLoadingAndErorr();

    const navigate = useNavigate();

    const compNameHandler = (e) => {
        setCompName(e.target.value)
    }
    const compSizeHandler = (e) => {
        setCompSize(e.target.value)
    }
    const industryHandler = (e) => {
        setIndustry(e.target.value)
    }
    const websiteHandler = (e) => {
        setWebsite(e.target.value)
    }


    const nextButtonHandler = async (e) => {
        setIsLoading(true);
        setError(null);
        e.preventDefault();

        if (!compName || !industry || !website || !compSize) {
            setError("Please fill all required fields.");
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/info/empdetails`, {
                companyName: compName,
                companySize: compSize,
                industry,
                website
            },
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            )

            if (response.status === 200) {
                navigate("/home")
            }
        } catch (err) {
            setError(err.response?.data?.msg)
        } finally {
            setIsLoading(false)
        }

    }

    return <>
        <div>
            <div>
                {isLoading ? (<p>Signining in...</p>) : (

                    <div className="font-[sans-serif] bg-white max-w-4xl mx-auto md:h-screen p-4 flex items-center">
                        <div className="py-4 mb-4 text-sm text-red-800 rounded-lg min-h-[60px]" role="alert">
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                        <form className="w-full py-6 px-6 sm:px-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl">
                            <div className="space-y-6">
                                <div>
                                    <Inputbox type={"text"} value={"Company Name*"} onChange={compNameHandler} />
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">
                                        Company Size*
                                    </label>
                                    <div className="relative flex items-center">
                                        <select
                                            value={compSize}
                                            onChange={compSizeHandler}
                                            required
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                        >
                                            <option value="">Select Size</option>
                                            <option value="small">Small</option>
                                            <option value="medium">Medium</option>
                                            <option value="large">Large</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <Inputbox type={"text"} value={"Industry*"} onChange={industryHandler} />
                                </div>
                                <div>
                                    <Inputbox type={"text"} value={"Website*"} onChange={websiteHandler} />
                                </div>
                            </div>
                            <div className="mt-12 flex justify-center">
                                <NextButton onClick={nextButtonHandler} />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    </>
}