import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {}; 
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          QUIZ
        </NavLink>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-800" : "text-black"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? "text-blue-800" : "text-black"
            }
          >
            Create Quiz
          </NavLink>
          {currentUser.email ? (
            <NavLink
              to="/logout"
              className="text-black"
              onClick={() => {
                localStorage.removeItem("currentUser"); 
                navigate("/signin"); 
              }}
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink to="/signup" className="text-black">
                Signup
              </NavLink>
              <NavLink to="/signin" className="text-black">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
