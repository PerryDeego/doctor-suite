import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'  // Import BrowserRouter
import About from './pages/About'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Home from './pages/Home'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <Router> {/* Wrap Routes in BrowserRouter */}
      <div className='mx-4 sm:mx-[10%]'>
        <NavBar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/appointment' element={ <Appointment /> } />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/doctors' element={ <Doctors /> } />
          <Route path='/doctors/:specialist' element={ <Doctors /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/appointment/:doctorId' element={ <Appointment /> } />
          <Route path='/my-appointments' element={ <MyAppointments /> } />
        </Routes>
      </div>
    </Router> 
  )
}

export default App
