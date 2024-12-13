import { useState } from "react";
import Inputbox from "../components/Inputbox";
import useLoadingAndErorr from "../hooks/useLoadingAndError";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function CreateJob() {

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    jobtype: "full-time",
    skills: "",
  });
  const { isLoading, setIsLoading, error, setError } = useLoadingAndErorr();
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };



  const postButtonHandler = async (e) => {
    setIsLoading(true);
    setError(null);
    e.preventDefault();
    const formattedData = {
      ...jobData,
      salary: {
        minimum: Number(jobData.salaryMin),
        maximum: Number(jobData.salaryMax),
      },
      skills: jobData.skills.split(",").map((skill) => skill.trim()),
    };

    try {
      const response = await axios.post("https://job-board-6coklfpr2-rajat-dotiyals-projects.vercel.app/api/v1/job/jobs",
        formattedData, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
      )
      if (response.status === 200) {
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.msg);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (<div  className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
        <Spinner/>
        </div>) : (

        <div className="bg-gray-50 min-h-screen py-10">
          <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a Job</h2>

            <form className="space-y-6">
              {/* Title */}
              <Inputbox type="text" name={"title"} value="Job Title" placeholder="Enter job title" onChange={handleChange} />


              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Job Description
                </label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Enter job description"
                  required
                ></textarea>
              </div>

              {/* Company */}
              <Inputbox name={"company"} value={"Company Name"} placeholder={"Enter company name"} type={"text"} onChange={handleChange} />

              {/* Location */}

              <Inputbox name={"location"} value={"Location"} placeholder={"Enter job location"} type={"text"} onChange={handleChange} />

              {/* Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <Inputbox name={"salaryMin"} value={"Minimum Salary"} placeholder={"Enter minimum salary"} type={"number"} min={0} onChange={handleChange} />


                <Inputbox name={"salaryMax"} value={"Maximum Salary"} placeholder={"Enter maximum salary"} type={"number"} min={0} onChange={handleChange} />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Job Type
                </label>
                <select
                  name="jobtype"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              {/* Skills */}

              <Inputbox name={"skills"} value={"Required Skills"} placeholder={"Enter skills separated by commas (e.g., JavaScript, React, Node.js)"} type={"text"} onChange={handleChange} />

              {/* Submit Button */}
              <div >
                <button
                  onClick={postButtonHandler}
                  className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Post Job
                </button>

                {successMessage && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    Job posted successfully!
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}