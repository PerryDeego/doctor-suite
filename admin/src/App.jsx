import React, { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Login from '../src/pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { accessToken } = useContext(AdminContext); // Fixed typo: 'acccessToken' to 'accessToken'
  
  return accessToken ? (
    <div>
      <ToastContainer />
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
};

export default App;
