import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice.js";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import SortMovies from './SortMovies'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user info from Redux state
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          🎬 MovieApp
        </Link>
        <SearchBar/>
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-500 ${isActive ? "text-yellow-500" : ""}`
            }
          >
            Home
          </NavLink>
          <SortMovies/>

          {isAdmin && (
            <>
              <NavLink
                to="/admin/add-movie"
                className={({ isActive }) =>
                  `hover:text-yellow-500 ${isActive ? "text-yellow-500" : ""}`
                }
              >
                Add Movie
              </NavLink>
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-yellow-500 ${isActive ? "text-yellow-500" : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `hover:text-yellow-500 ${isActive ? "text-yellow-500" : ""}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
