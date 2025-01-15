// admin/src/App.jsx
// Packages
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import Dashboard from "./pages/Admin/Dashboard";
import Footer from "./components/Footer";
import { AdminContext } from "./context/AdminContext";
import Login from "../src/pages/Login";
import Navbar from "./components/Navbar";
import Settings from "./pages/Admin/Settings";
import ShowAppointments from "./pages/Admin/ShowAppointments";
import Sidebar from "./components/Sidebar";

const App = () => {
  const { accessToken } = useContext(AdminContext); 

  return accessToken ? (
    <div className="bg-[#F89FD]">
      <ToastContainer />
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctor-list" element={<DoctorList />} />
        <Route path="/show-appointments" element={<ShowAppointments />} />
        <Route path="/setting" element={<Settings />} />
      </Routes>
      <Footer />
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
};

export default App;