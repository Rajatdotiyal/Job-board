import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLoadingAndErorr from "../hooks/useLoadingAndError";
import useUserRole from "../hooks/useUserRole";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { isLoading, setIsLoading, error, setError } = useLoadingAndErorr();
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [resume, setResume] = useState(null);
  const {userRole} = useUserRole();

  const navigate  = useNavigate();
 

    
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  useEffect(() => {
    if (!id) {
      setError("Job ID is missing!");
      return;
    }
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/jobs/${id}`,
          {
            headers: {

              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setJob(response.data.job);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Job not found!</div>;
  }

  const formData = new FormData();
  formData.append("resume", resume);


  const applyButtonHandler = async () =>{
   
    try{

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/app/application?jobId=${job._id}`,
        formData, 
        {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem('token')
        }
      })
      alert("Resume uploaded successfully!");
      setShowResumeUpload(false)
    }catch(err){
      alert(err.message);
    }
      
    
  }

 

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 py-10 flex justify-center items-center relative">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6">
          <h1 className="text-4xl font-bold">{job.title}</h1>
          <p className="mt-4 text-lg">
            <span className="font-semibold">Company:</span> {job.company}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Location:</span>{" "}
            {job.location || "Not specified"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Type:</span> {job.jobtype}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Posted on:</span>{" "}
            {new Date(job.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          {/* Salary */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">💰 Salary Range</h2>
            <p className="text-lg text-gray-600 mt-2">
              {job.salary?.minimum ? `$${job.salary?.minimum}` : "Not specified"}{" "}
              -{" "}
              {job.salary?.maximum ? `$${job.salary?.maximum}` : "Not specified"}
            </p>
          </div>

          {/* Job Description */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              📄 Job Description
            </h2>
            <p className="text-gray-600 mt-2 leading-relaxed">{job.description}</p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              🛠 Required Skills
            </h2>
            <ul className="mt-2 text-lg text-gray-600 list-disc list-inside">
              {job.skills.map((skill, index) => (
                <li key={index} className="mt-1">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center space-x-6 px-8 py-6 text-center">
          <button
            onClick={() => userRole === "employer" ? navigate("/applicants",{state:{jobId: job._id,title:job.title}}) :  setShowResumeUpload(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            {userRole === "employer" ? "View Applicants" : "Apply for Job"}
          </button>
        </div>
      </div>

      {/* Modal for Resume Upload */}
      {showResumeUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Upload Your Resume
            </h3>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mb-4 border rounded p-2 w-full"
            />
            <div className="space-x-4 flex justify-center">
              <button
                onClick={() => setShowResumeUpload(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={applyButtonHandler}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
