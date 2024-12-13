import { Link } from "react-router-dom";

export default function JobCard ({id,role, location ,salary, onClick}){

    return<>
    <div className="bg-white shadow-md rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-800">
                {role}
              </h4>
              <p className="text-gray-600">{location}</p>
              <p className="text-indigo-600 font-bold mt-2">&#8377;{salary?.minimum || ""} - &#8377;{salary.maximum || ""}</p>
              <Link
              to={`/job/${id}`}
                className="text-indigo-600 font-medium mt-4 inline-block hover:underline"
              >
                View Details
              </Link>
            </div>
    </>
}