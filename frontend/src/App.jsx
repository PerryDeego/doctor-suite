import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'; // Import useLocation
import About from './pages/About';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Doctors from './pages/Doctors';
import Home from './pages/Home';
import Login from './pages/Login';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className='mx-4 sm:mx-[10%]'>
      {/* Conditionally render NavBar based on the current path */}
      {location.pathname !== '/login' && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
      </Routes>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default App;
