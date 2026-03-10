import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { LogoutModal } from "./LogoutModal"; // Adjust path as needed
import { toast } from "react-toastify";
// import AboutUs from "../pages/AboutUs";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Header = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "About", path:"/About" },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // const [onlineCustomer, setOnlineCustomer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const user = userInfo?.data?.role;
  const userName = userInfo?.data?.name;

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      toast.success("Logout Successfully");
      dispatch(logoutUser());
      console.log(res);
      setShowLogoutModal(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      // Optionally toast error
      // setShowLogoutModal(false);
    }
  };
  /*
  const profileImageUrl = userInfo?.data?.profilePic
    ? console.log(
        `${BASE_URL}/uploads/${userInfo?.data?.profilePic}`,
        "from redux"
      )
    : "/default-avatar.png";
*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 bg-white text-gray-700 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-indigo-500 font-extrabold text-3xl">
            PrintPress
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Right */}

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/register-shop">
                <button className="bg-white cursor-pointer text-black px-4 py-2 rounded-md ml-4 hover:text-gray-500">
                  Work with Us
                </button>
              </Link>
              <Link to="/login-customer">
                <button className="border cursor-pointer border-gray-300 px-4 py-2 rounded-md ml-4 hover:bg-gray-100">
                  Login
                </button>
              </Link>
              <Link to="/register-customer">
                <button className="bg-indigo-500 cursor-pointer text-white px-4 py-2 rounded-md ml-4 hover:bg-indigo-600">
                  SignUp
                </button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-3 cursor-pointer py-2 rounded-md bg-slate-50 transition text-sm font-medium "
              >
                {/* <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover border border-gray-300"
                  /> */}

                <span className="hidden sm:inline">
                  {userName?.split(" ")[0]}
                </span>
                <div>
                  {showDropdown ? (
                    <FaChevronUp size={14} />
                  ) : (
                    <FaChevronDown size={14} />
                  )}
                </div>
              </button>

              {showDropdown && (
                <div className="absolute cursor-pointer right-0 mt-2 w-44 bg-white border border-gray-200 shadow-xl rounded-lg z-50 animate-fade-slide">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="block cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <svg
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}

          <Link to="/register-shop">
            <button className="bg-white text-black px-4 py-2 rounded-md ml-4 transition-all duration-500">
              Work with Us
            </button>
          </Link>

          <Link to="/login-customer">
            <button className="bg-white text-black border cursor-pointer border-gray-300 px-4 py-2 rounded-md ml-4 transition-all duration-500 hover:bg-gray-100 hover:text-black">
              Login
            </button>
          </Link>

          <Link to="/register-customer">
            <button className="bg-indigo-500 text-white cursor-pointer px-4 py-2 rounded-md ml-4 transition-all duration-500 hover:bg-indigo-600">
              SignUp
            </button>
          </Link>
        </div>
        {showLogoutModal && (
          <LogoutModal
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
          />
        )}
      </nav>
    </>
  );
};

export default Header;
