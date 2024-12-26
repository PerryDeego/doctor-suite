import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { accessToken, assets, setAccessToken } = useContext(AdminContext);
    const navigate = useNavigate();

    const logout = () => {
        if (accessToken) {
            setAccessToken('');
            localStorage.removeItem('accessToken');
            navigate('/');
        }
    };

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img
                    className='w-36 sm:w-40 cursor-pointer'
                    src={assets.logo}
                    alt='admin logo'
                />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                    {accessToken ? 'Admin' : 'Doctor'}
                </p>
            </div>

            {accessToken && ( // Only show the logout button if the user is logged in
                <button
                    className="h-12 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
                    onClick={logout}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;