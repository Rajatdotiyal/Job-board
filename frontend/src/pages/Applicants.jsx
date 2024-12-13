import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Applicants = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const jobId = location.state?.jobId;
  const title = location.state?.title;
  // Fetch candidates for the specific job
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/app/job/${jobId}/applicants`,
          {
            headers: {
              Authorization: localStorage.getItem("token"), // Ensure employer's token is valid
            },
          }
        );
        setCandidates(response.data.applicants);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch candidates.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [jobId]);

  if (isLoading) {
    return <div className="text-center text-lg font-bold mt-10">Loading candidates...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500 mt-10">Error: {error}</div>;
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        {`Applicants for Job: ${title}`}
      </h1>
      {candidates.length === 0 ? (
        <div className="text-center text-gray-600">
          No candidates have applied for this job yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {candidate.userId.firstname} {candidate.userId.lastname}
              </h2>
              <p className="text-gray-600">
                <strong>Email:</strong> {candidate.userId.email}
              </p>
              <p className="text-gray-600">
                <strong>Skills:</strong> {candidate.userId.jobSeekerProfile
                  .skills.join(", ") || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Experience:</strong> {candidate.userId.jobSeekerProfile.experience || 0} years
              </p>
              {candidate.resumeUrl?.fileName && (
                <div className="mt-4">
                  <a
                    href={`data:${candidate.resumeUrl.contentType};base64,${candidate.resumeUrl.data}`}
                    download={candidate.resumeUrl.fileName}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
