import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import JobCard from "../components/JobCard";
import useUserRole from "../hooks/useUserRole";
import Footer from "./Footer";
import useSignupandSignin from "../hooks/useSignupSigninButton";

export default function Home() {
  const [jobData, setJobData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3; // Number of jobs per page for employer
  const { userRole, userId } = useUserRole();
  const { isButton, setIsButton } = useSignupandSignin();

  useEffect(() => {
    // Fetch all jobs (for jobseekers)
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://job-board-6coklfpr2-rajat-dotiyals-projects.vercel.app/api/v1/job/jobs", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setJobData(response.data.allJobs);
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    // Fetch the jobs posted by the employer
    const fetchUserJobs = async () => {
      if (userRole === "employer" && userId) {
        setLoading(true);
        try {
          const response = await axios.get(`https://job-board-6coklfpr2-rajat-dotiyals-projects.vercel.app/api/v1/job/user/${userId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          setUserData(response.data);
        } catch (err) {
          console.error("Error fetching employer's jobs:", err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserJobs();
  }, [userRole, userId]);

  const getRandomItems = (arr, num) => {
    if (arr.length === 0) return [];
    const randomItems = [];
    const seenIndexes = new Set();

    while (randomItems.length < num && seenIndexes.size < arr.length) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!seenIndexes.has(randomIndex)) {
        seenIndexes.add(randomIndex);
        randomItems.push(arr[randomIndex]);
      }
    }
    return randomItems;
  };

  const randomJobs = getRandomItems(jobData, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar isButton={isButton} setIsButton={setIsButton} />

      {/* Main Content */}
      <main className="flex-grow">
        <HeroSection role={userRole} />
        {loading ? (
          <p className="text-center py-12">Loading...</p>
        ) : userRole === "jobseeker" ? (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured Jobs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {randomJobs.map((job) => (
                  <JobCard key={job._id} id={job._id} role={job.title} location={job.location} salary={job.salary} />
                ))}
              </div>
            </div>
          </section>
        ) : userRole === "employer" && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Manage Your Jobs</h3>
              {userData && userData.length === 0 ? (
                <div>
                  <p className="text-gray-700">You have not posted any jobs yet.</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Create a Job</button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700">Your posted jobs:</p>

                  {/* Jobs Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {userData
                      .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
                      .map((job) => (
                        <JobCard
                          key={job._id}
                          id={job._id}
                          role={job.title}
                          location={job.location}
                          salary={job.salary}
                        />
                      ))}
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex justify-center mt-6">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded mr-2"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Previous
                    </button>
                    <button
                      className="bg-gray-300 px-4 py-2 rounded"
                      disabled={currentPage * jobsPerPage >= userData.length}
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, Math.ceil(userData.length / jobsPerPage))
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
