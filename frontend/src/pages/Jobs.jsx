import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import JobCard from "../components/JobCard";
import Footer from "./Footer";
import useSignupandSignin from "../hooks/useSignupSigninButton";

export default function Jobs() {
  const [jobData, setJobData] = useState([]);
  const [shuffledJobs, setShuffledJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { isButton, setIsButton } = useSignupandSignin();

  useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get("https://job-board-henna-omega.vercel.app/api/v1/job/jobs", {
              headers: {
                  Authorization: localStorage.getItem("token"),
              },
          });
          setJobData(response.data.allJobs);
      };
      fetchData();
  }, []);

  useEffect(() => {
      if (jobData.length > 0) {
          const shuffled = getRandomJob(jobData);
          setShuffledJobs(shuffled);
      }
  }, [jobData]);

  const getRandomJob = (arr) => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
  };

  const handleSearch = (e) => {
      e.preventDefault();
      const filteredJobs = jobData.filter((job) =>
          `${job.title} ${job.location} ${job.salary}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
      );
      setShuffledJobs(filteredJobs);
  };

  return (
      <div className="flex flex-col min-h-screen bg-gray-100">
          {/* Navbar */}
          <Navbar isButton={isButton} setIsButton={setIsButton} />

          {/* Main Content */}
          <main className="flex-grow container mx-auto px-4 py-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse Jobs</h2>

              {/* Search Bar */}
              <div className="mb-8">
                  <form
                      onSubmit={handleSearch}
                      className="flex items-center bg-white shadow-md rounded-lg p-4"
                  >
                      <input
                          type="text"
                          placeholder="Search for jobs, skills, or companies..."
                          className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-600"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button
                          type="submit"
                          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                          Search
                      </button>
                  </form>
              </div>

              {/* Job Listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shuffledJobs.map((job) => (
                      <JobCard
                          key={job._id}
                          id={job._id}
                          role={job.title}
                          location={job.location}
                          salary={job.salary}
                      />
                  ))}
              </div>
          </main>

          {/* Footer */}
          <Footer />
      </div>
  );
}
