// frontend/src/components/TopSpecialist.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopSpecialist = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  if (!Array.isArray(doctors)) {
      return <div><p className="mb-10">Loading Doctors...</p></div>;
  }

  if (doctors.length === 0) {
      return <div><p className="text-3xl font-medium text-center text-primary mb-10">No doctors available at the moment.</p></div>;
  }

  const handleDoctorClick = (id) => {
      navigate(`/appointment/${id}`);
      window.scrollTo(0, 0);
  };

  return (
      <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
          <h1 className="text-3xl font-medium text-center">Top Specialists to Book Your Appointment With</h1>
          <p className="sm:w-1/3 text-center text-sm">Simply browse through the list to find your trusted doctor.</p>
          
          <div className="w-full grid grid-cols-auto gap-4 pt-5 px-3 sm:px-0">
              {doctors.slice(0, 10).map((item) => (
                  <div
                      key={item._id} // Use _id for MongoDB documents
                      className="relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                      onClick={() => handleDoctorClick(item._id)}
                  >
                      <img className="w-full h-48 object-cover bg-blue-50" src={item.image} alt={`Doctor ${item.name}`} />
                      <div className="relative p-4 flex flex-col gap-2">
                          <div className="absolute inset-0 bg-blue-600 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
                          <div className="flex items-center gap-2 text-sm text-center text-green-500 z-20">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              <p>{item.available ? 'Available' : 'Not Available'}</p>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 truncate z-20">{item.name}</h3>
                          <p className="text-sm text-gray-500 truncate z-20">{item.speciality}</p>
                      </div>
                  </div>
              ))}
          </div>

          <button
              className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-colors duration-300 hover:text-primary"
              onClick={() => navigate('/doctors')}
              aria-label="View more doctors"
          >
              More
          </button>
      </div>
  );
};

export default TopSpecialist;
