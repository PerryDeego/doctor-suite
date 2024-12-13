import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 
import { MdSupport, MdLocationOn, MdCall } from "react-icons/md"; 

const NavBar = () => {
  const { assets } = useContext(AppContext); // Access assets from context
  const navigate = useNavigate(); 
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State for profile menu visibility
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State for mobile menu visibility
  const [ token ] = useState(true); // Placeholder for authentication token

  // Toggle functions for menus
  const toggleProfileMenu = () => setShowProfileMenu(prev => !prev);
  const toggleMobileMenu = () => setShowMobileMenu(prev => !prev);

  return (
    <div>
     {/* Top Bar with Contact Information */}
<div className="hidden md:flex items-center justify-between px-4 py-2 text-sm text-gray-600 bg-gray-100">
  <a href="mailto:support@gmail.com" className="flex items-center">
    <MdSupport className="mr-2 text-primary" /> {/* Change color here */}
    support@doctorsuites.com
  </a>
  
  <span className="flex items-center">
    <MdLocationOn className="mr-2 text-blue-600" /> {/* Change color here */}
    Address: 145 NW Ave, New York, USA
  </span>
  
  <a href="tel:+23-345-67890" className="flex items-center">
    <MdCall className="mr-2 text-blue-600" /> {/* Change color here */}
    Call Now: 
    <span className="ml-2">+1 823-4565-13456</span>
  </a>
</div>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
        {/* Logo that navigates to home */}
        <img 
          className="w-44 cursor-pointer" 
          src={assets.logo} 
          alt="logo" 
          onClick={() => navigate('/')} 
        />

        {/* Navigation Links */}
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
              {/* Home icon for the home link */}
              {path === '/' ? <FaHome className="mr-2 color-primary" style={{ color: '#1e90ff' }} /> : null}
              {path.replace('/', '') || 'HOME'}
            </NavLink>
          ))}
        </ul>

        {/* User Profile / Login Button */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer relative group" onClick={toggleProfileMenu}>
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="profile pic"
              />
              {/* Profile Menu */}
              {showProfileMenu && (
                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20">
                  <div className="min-w-48 bg-primary-gradient rounded flex flex-col gap-4 p-4">
                    <p className="hover:text-white cursor-pointer" onClick={() => navigate('/my-profile')}>My Profile</p>
                    <p className="hover:text-white cursor-pointer" onClick={() => navigate('/my-appointments')}>My Appointments</p>
                    <p className="hover:text-white cursor-pointer" onClick={() => navigate('/login')}>Logout</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Button to create an account if not logged in
            <button
              className="bg-primary text-white px-8 py-3 rounded-full font-light hidden hover:text-primary md:block"
              onClick={() => navigate("/login")}
            >
              Create account
            </button>
          )}
          
          {/* Mobile Menu Icon */}
          <img 
            className="w-6 md:hidden" 
            src={assets.menu_icon} 
            alt="menu icon" 
            onClick={toggleMobileMenu} 
          />
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
                {/* Home icon for mobile view */}
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