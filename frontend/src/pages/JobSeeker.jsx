import React, { useState } from "react";
import NextButton from "../components/NextButton"; // Import NextButton component
import axios from "axios";
import useLoadingAndErorr from "../hooks/useLoadingAndError";
import { useNavigate } from "react-router-dom";

export default function JobSeeker() {
    const [skills, setSkills] = useState([]); // Store skills as an array
    const [experience, setExperience] = useState("");
    const [resume, setResume] = useState(null); // State for the uploaded file
    const [newSkill, setNewSkill] = useState(""); // New skill to add to the list
    const { isLoading, setIsLoading, error, setError } = useLoadingAndErorr();
    const navigate = useNavigate();

    // Handle file change (when user selects a file)
    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    // Handle adding a new skill to the skills array
    const handleAddSkill = () => {
        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
            setNewSkill(""); // Clear the input after adding
        }
    };

    const nextButtonHandler = async (e) => {
        setIsLoading(true);
        setError(null);
        e.preventDefault();

        const formData = new FormData();
        formData.append("skills", JSON.stringify(skills)); // Send skills array as a JSON string
        formData.append("experience", experience);
        formData.append("resume", resume);

        try {
            const response = await axios.post("https://job-board-6coklfpr2-rajat-dotiyals-projects.vercel.app/api/v1/user/info/jsdetails",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("token"),
                    }
                }
            )
            if (response.status === 200) {
                navigate("/home")
            }

        } catch (err) {
            setError(err.response?.data?.msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div>
                <div>
                    {isLoading ? (<p>Signing in ....</p>) : (

                        <div className="font-[sans-serif] bg-white max-w-4xl mx-auto md:h-screen p-4 flex items-center">
                            <div className="py-4 mb-4 text-sm text-red-800 rounded-lg min-h-[60px]" role="alert">
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                            <form className="w-full py-6 px-6 sm:px-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl">
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Skills*</label>
                                        <input
                                            type="text"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)} // Handle skill input change
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                            placeholder="Enter skill"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSkill}
                                            className="mt-2 text-white bg-blue-500 px-4 py-1 rounded"
                                        >
                                            Add Skill
                                        </button>
                                        <div className="flex mt-2">
                                            <strong>Added Skills:</strong>
                                            <ul className="flex pl-4 space-x-4"> {/* Added `space-x-4` for spacing */}
                                                {skills.map((skill, index) => (
                                                    <li key={index} className="text-gray-800"> {/* Optional styling for individual skills */}
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Years of Experience*</label>
                                        <input
                                            type="text"
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)} // Handle experience input change
                                            required
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                            placeholder="Enter experience"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">Upload Resume (PDF only)*</label>
                                        <input
                                            type="file"
                                            accept="application/pdf" // Only allow PDF files
                                            onChange={handleFileChange} // Handle file selection
                                            required
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-12 flex justify-center">
                                    <NextButton
                                        onClick={nextButtonHandler}
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
