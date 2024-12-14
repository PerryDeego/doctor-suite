import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log('Logging in:', { username, password });
      // Add your login logic here
    } else {
      console.log('Registering:', { username, email, password });
      // Add your registration logic here
    }
  }; // Closing bracket added here

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-gradient rounded-lg">
      <div className="container w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Registration'}</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Username" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              aria-label="Username"
            />
          </div>
          {!isLogin && (
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
              />
            </div>
          )}
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
            />
          </div>
          {isLogin && (
            <div className="mb-4 text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
          )}
          <button 
            type="submit" 
            className="w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button 
          className="mt-4 text-blue-500 hover:underline" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Create an account' : 'Already have an account'}
        </button>
      </div>
    </div>
  );
};

export default Login;
