import { useNavigate } from "react-router-dom"

export default function HeroSection({role}){
    const navigate = useNavigate();
    return<>
    <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Your Dream Job Awaits!
          </h2>
          <p className="text-lg mb-6">
            Explore thousands of job opportunities and start your career journey today.
          </p>
          <button
             onClick={()=> {role === "employer" ? navigate("/createjob"): navigate("/jobs")}}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            {role === "employer" ? <div>Create a Job</div> : <div>Browse Jobs</div>}
          </button>
        </div>
      </section>
    </>
}