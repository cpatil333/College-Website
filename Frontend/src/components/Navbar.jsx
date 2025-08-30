import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useEffect } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // get user + token from redux
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // ✅ redirect only inside useEffect
  useEffect(() => {
    if (!token && path !== "/login" && path !== "/register") {
      navigate("/login");
    }
  }, [token, path, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <h2>My College</h2>
      <ul>
        {token ? (
          <>
            <li>
              <span style={{ color: "white", fontSize:"20px" }}>Welcome, {user?.fullName}</span>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* Role wise menus */}
            {user?.role === "STUDENT" && (
              <>
                <li>
                  <Link to="/student-program">Program</Link>
                </li>
                <li>
                  <Link to="/student-course">Course</Link>
                </li>
                <li>
                  <Link to="/student-enrollment">Enrollment</Link>
                </li>
              </>
            )}
            {user?.role === "FACULTY" && (
              <>
                <li>
                  <Link to="/faculty-courses">Course</Link>
                </li>
                <li>
                  <Link to="/faculty-notices">Notice</Link>
                </li>
                <li>
                  <Link to="/event">Event</Link>
                </li>
              </>
            )}
            {user?.role === "ADMIN" && (
              <>
                <li>
                  <Link to="/programs">Program</Link>
                </li>
                <li>
                  <Link to="/courses">Course</Link>
                </li>
                <li>
                  <Link to="/enrollment">Enrollment</Link>
                </li>
                <li>
                  <Link to="/notice">Notice</Link>
                </li>
                <li>
                  <Link to="/event">Event</Link>
                </li>
                <li>
                  <Link to="/contact-message">Contact Message</Link>
                </li>
              </>
            )}
            {user?.role === "ALUMNI" && (
              <>
                <li>
                  <Link to="/event">Event</Link>
                </li>
              </>
            )}
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
