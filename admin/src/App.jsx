import React, { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddDoctor from "../src/pages/Admin/AddDoctor"
import ShowAppointments from "../src/pages/Admin/ShowAppointments";
import Dashboard from "../src/pages/Admin/Dashboard";
import Login from "../src/pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Settings from "./pages/Admin/Settings";

const App = () => {
  const { accessToken } = useContext( AdminContext ); 

  return accessToken ? (
    <div className="bg-[#F89FD]">
      <ToastContainer />
      <Navbar />
      
        <Sidebar />
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/show-appointments" element={<ShowAppointments />} />
            <Route path="/setting" element={ <Settings />} />
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
