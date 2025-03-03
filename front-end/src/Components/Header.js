import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { useAuth } from '../ContextAPI/authContext';
import requestApi from '../helpers/api';


const Header = ({ theme, toggleTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userProgress, setUserProgress] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await requestApi(`/user_process/user/${user.id}`, 'GET');
        if (response.data) {
          setUserProgress(response.data); // Store progress data in state
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    if (user) {
      fetchProgress();
    }
  }, [user]);

  




  return (
    <header
      className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} 
        w-full shadow-md relative z-10`}
    >
      <div className="max-w-[96rem] mx-auto flex justify-between items-center p-4">
        <Link to="/">
          <div className="flex items-center">
            <img
              src="/logo-dailydictation.png"
              alt="DailyDictation Logo"
              className="h-8 mr-2"
            />
            <div className="font-bold text-2xl">DailyDictation</div>
          </div>
        </Link>

        <nav className="flex items-center">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/exercises"
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                  hover:text-blue-500`}
              >
                All exercises
              </Link>
            </li>
            <li>
              <Link
                to="/top-users"
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                  hover:text-blue-500`}
              >
                Top users
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex gap-2 items-center ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-500`}
              >
                Video lessons
                <FaCaretDown />
              </button>
              {isDropdownOpen && (
                <div
                  className={`absolute w-max left-0 mt-2 py-1 border border-gray-500 
                    shadow-lg rounded-md ${
                    theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-black"
                  }`}
                >
                  <Link
                    to="/english-expressions"
                    className={`block px-4 py-2 ${
                      theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    English expressions
                  </Link>
                  <Link
                    to="/english-pronunciation"
                    className={`block px-4 py-2 ${
                      theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    English pronunciation
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/learntogether"
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                  hover:text-blue-500`}
              >
                Learn Together
              </Link>
            </li>
            <li>
              <Link
                to="/support-dailydictation"
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                  flex items-center`}
              >
                Help me{" "}
                <span role="img" aria-label="praying hands" className="ml-1">
                  🙏
                </span>
              </Link>
            </li>
          </ul>

          <ul className="flex items-center space-x-4 ml-6">
            {user ? (
              <>
                <li>
                  <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    0 minutes
                  </span>
                </li>
                <li>
                  <Link
                    to="/in-progress"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                      hover:text-blue-500`}
                  >
                    In-progress
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notes"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                      hover:text-blue-500`}
                  >
                    Notes
                  </Link>
                </li>
                <li className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                      hover:text-blue-500`}
                  >
                    {user.username || "User"} 
                  </button>
                  {isUserDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 py-1 w-48 border border-gray-500 
                        shadow-lg rounded-md ${
                        theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-black"
                      }`}
                    >
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 ${
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Public Profile
                      </Link>
                      <Link
                        to="/account-information"
                        className={`block px-4 py-2 ${
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Account Information
                      </Link>
                      <Link
                        to="/notifications"
                        className={`block px-4 py-2 ${
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Notifications
                      </Link>
                      <Link
                        to="/comments"
                        className={`block px-4 py-2 ${
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Comments
                      </Link>
                      <Link
                        to="/favorite-lessons"
                        className={`block px-4 py-2 ${
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Favorite lessons
                      </Link>
                      <Link
                        to="/change-password"
                        className={`block px-4 py-2 ${
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Change password
                      </Link>
                      <Link
                        to="/change-email"
                        className={`block px-4 py-2 ${
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Change email
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`block px-4 py-2 text-left w-full ${
                          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                      hover:text-blue-500`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                      hover:text-blue-500`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={toggleTheme}
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
                  hover:text-blue-500 text-2xl`}
              >
                {theme === "dark" ? "🌚" : "🌞"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;