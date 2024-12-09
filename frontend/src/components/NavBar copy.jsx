import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Import the FaHome icon
import { MdSupport, MdLocationOn, MdCall } from "react-icons/md"; // Importing Material Design icons

const NavBar = () => {
  const { assets } = useContext(AppContext);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [token] = useState(true); // Assuming token is always true for this example

  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  return (
    <div>
      {/* Top Bar Info */}
      <div className="hidden md:flex items-center justify-between px-4 py-2 text-sm text-indigo-600 bg-gray-100">
        <a href="mailto:support@gmail.com" className="flex items-center">
          <MdSupport className="mr-2" />
          support@doctorsuites.com
        </a>
        
        <span className="flex items-center">
          <MdLocationOn className="mr-2" />
          Address: 145 NW Ave, New York, USA
        </span>
        
        <a href="tel:+23-345-67890" className="flex items-center">
          <MdCall className="mr-2" />
          Call Now: 
          <span className="ml-2">+1 823-4565-13456</span>
        </a>
      </div>
      
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
            <div className="flex items-center gap-2 cursor-pointer relative group" onClick={toggleProfileMenu}>
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="profile pic"
              />
              {showProfileMenu && (
                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20">
                  <div className="min-w-48 bg-blue-100 rounded flex flex-col gap-4 p-4">
                    <p className="hover:text-black cursor-pointer" onClick={() => navigate('/my-profile')}>My Profile</p>
                    <p className="hover:text-black cursor-pointer" onClick={() => navigate('/my-appointments')}>My Appointments</p>
                    <p className="hover:text-black cursor-pointer" onClick={() => navigate('/login')}>Logout</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
              onClick={() => navigate("/login")}
            >
              Create account
            </button>
          )}
          <img className="w-6 md:hidden" src={assets.menu_icon} alt="menu icon" onClick={toggleMobileMenu} />
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-lg p-4">
          <ul className="flex flex-col gap-2">
            {["/", "/DOCTORS", "/CONTACT", "/ABOUT"].map((path, index) => (
              <NavLink 
                key={index} 
                to={path} 
                className={({ isActive }) => 
                  `flex items-center px-2 py-2 ${
                    isActive 
                      ? 'bg-[#dfe0e5] border-l-2 border-blue-500' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
                onClick={() => setShowMobileMenu(false)} // Close menu on item click
              >
                {path === '/' ? <FaHome className="mr-2 color-primary" style={{ color: '#1F51FF' }} /> : null}
                {path.replace('/', '') || 'HOME'}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;