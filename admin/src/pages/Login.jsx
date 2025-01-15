import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Admin');
  const { setAccessToken, backendURL, endpoint } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
    
      const { data } = await axios.post(backendURL + endpoint + '/login', { email, password });

      // Check if data contains a token
      if (data.token) {
        
        localStorage.setItem('accessToken', data.token);
        setAccessToken(data.token);
        toast.success('Login successful!');
      } else {
        toast.error(data.message || 'Login failed.', { className: 'toast-error' });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { className: 'toast-error' });
      console.error('Login error:', error);
    }
  };

  return (
    <div className='bg-primary-gradient flex items-center justify-center min-h-screen'>
      <div className="container w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {state === 'Admin' ? 'Admin ' : 'Doctor '}<span className="text-primary">Login</span>
        </h2>

        <form onSubmit={onSubmitHandler}>
          {/* Email Input */}
          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              aria-label="Email"
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              aria-label="Password"
              autoComplete="current-password"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Toggle between Admin and Doctor Login */}
        <button 
          className="mt-4 text-sm text-blue-500 hover:underline" 
          onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
        >
          {state === 'Admin' ? 'Doctor? Click here' : 'Admin? Click here'}
        </button>
      </div>
    </div>
  );
};

export default Login;
