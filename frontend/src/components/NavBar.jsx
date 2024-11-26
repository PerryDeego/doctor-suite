import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Import the FaHome icon

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token] = useState(true); // Assuming token is always true for this example

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <nav className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img 
        className="w-44 cursor-pointer" 
        src={assets.logo} 
        alt="logo" 
        onClick={() => navigate('/')} 
      />
      <ul className="hidden md:flex items-start gap-5 font-medium relative">
        {["/", "/DOCTORS", "/CONTACT", "/ABOUT"].map((path, index) => (
          <NavLink 
            key={index} 
            to={path} 
            className={({ isActive }) => 
              `relative flex items-center px-2 py-2 ${
                isActive 
                  ? 'bg-[#dfe0e5] border-l-2 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            {path === '/' ? <FaHome className="mr-2 color-primary" style={{ color: '#1F51FF' }} /> : null}
            {path.replace('/', '') || 'HOME'}
            {({ isActive }) => isActive && (
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-gray"></span>
            )}
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer relative group" onClick={toggleMenu}>
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="profile pic"
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="dropdown icon"
            />
            {showMenu && (
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-blue-100 rounded flex flex-col gap-4 p-4">
                  <p className="hover:text-black cursor-pointer" onClick={() => navigate('/my-profile')}>My Profile</p>
                  <p className="hover:text-black cursor-pointer">My Appointments</p>
                  <p className="hover:text-black cursor-pointer">Logout</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            onClick={() => navigate("/login")} // Fixed navigate function call
          >
            Create account
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;