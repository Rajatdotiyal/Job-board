
import { useNavigate } from "react-router-dom"
import NavButton from "./NavButton";
export default function Navbar({isButton,setIsButton}) {
  
  const navigate = useNavigate();

  return <>
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">JobBoard</h1>
        <nav>
          <div className="flex space-x-6 jusc">
            <div>

            <NavButton val={"Jobs"} onClick={() => navigate("/jobs")} />
            </div>
            <div>

            <NavButton val={"About us"} onClick={() => navigate("/aboutus")} />
            </div>

            {!isButton &&
              <div className="flex  space-x-6">

                <div>
                  <button
                    onClick={() => navigate("/signin")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            }

            {isButton &&
              <div>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsButton(false);
                    navigate('/signin')
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            }

          </div>
        </nav>
      </div>
    </header>
  </>
}