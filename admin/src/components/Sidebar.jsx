import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarCheck, FaUser , FaCog, FaBars, FaTimes, FaList } from 'react-icons/fa'; // Importing additional icons

const Sidebar = () => {
    const { accessToken } = useContext(AdminContext);
    const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar visibility
    };

    return (
        <div className={`bg-gray-800 h-screen fixed top-0 left-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {accessToken && (
                <>
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-white">Admin Panel</h2>
                        <button onClick={toggleSidebar} className="text-white">
                            {isOpen ? <FaTimes /> : <FaBars />} {/* Toggle icon */}
                        </button>
                    </div>
                    <ul className="mt-4">
                        <li className="p-4">
                            <NavLink to="/admin-dashboard" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
                                <FaTachometerAlt className="w-6 h-6 mr-2" /> {/* Dashboard Icon */}
                                {isOpen && <span>Dashboard</span>}
                            </NavLink>
                        </li>
                        <li className="p-4">
                            <NavLink to="/show-appointments" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
                                <FaCalendarCheck className="w-6 h-6 mr-2" /> {/* Show Appointments Icon */}
                                {isOpen && <span>Show Appointments</span>}
                            </NavLink>
                        </li>
                        <li className="p-4">
                            <NavLink to="/add-doctor" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
                                <FaUser  className="w-6 h-6 mr-2" /> {/* Add Doctor Icon */}
                                {isOpen && <span>Add Doctor</span>}
                            </NavLink>
                        </li>
                        <li className="p-4">
                            <NavLink to="/doctor-list" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
                                <FaList  className="w-6 h-6 mr-2" /> {/* Add Doctor Icon */}
                                {isOpen && <span>Doctor List</span>}
                            </NavLink>
                        </li>
                        <li className="p-4">
                            <NavLink to="/settings" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
                                <FaCog className="w-6 h-6 mr-2" /> {/* Settings Icon */}
                                {isOpen && <span>Settings</span>}
                            </NavLink>
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
};

export default Sidebar;