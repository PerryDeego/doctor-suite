import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendURL, accessToken, setAccessToken, userEndpoint } = useContext(AppContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {

      if (isLogin) {
        const { data } = await axios.post(`${backendURL}${userEndpoint}/login`, { email, password });

        if (data.success) {
          localStorage.setItem('accessToken', data.token);
          setAccessToken(data.token); 
          console.log("Home page next")  
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendURL}${userEndpoint}/register`, { name, email, password });
       
        if (data.success) {
          localStorage.setItem('accessToken', data.token);
          setAccessToken(data.token);       
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Login error:", error.response.data);
        const errorMessage = error.response.data.message || 'An unexpected error occurred. Please try again later.';
        toast.error(errorMessage);
      } else {
        console.error("Error:", error.message);
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Effect to handle navigation
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-gradient rounded-lg">
      <div className="container w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={onSubmitHandler} aria-live="polite">
          {!isLogin && (
            <div className="mb-4 relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                aria-label="name"
                autoComplete="name"
              />
            </div>
          )}
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
          {isLogin && (
            <div className="mb-4 text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
          )}
          <button 
            type="submit" 
            className={`w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        <button 
          className="mt-4 text-blue-500 hover:underline" 
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? 'Create an Account' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;