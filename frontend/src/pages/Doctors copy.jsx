import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { doctors } = useContext( AppContext ); 
  const [ filterDoc, setFilterDoc ] = useState([]);
  const navigate = useNavigate();
  const { speciality } = useParams();

  // Debugging information
  console.log(speciality);

  const filterSpeciality= () => {
      if (speciality) {
        setFilterDoc(doctors.filter(doc => doc.speciality.toLowerCase() === speciality))
      } else {
        setFilterDoc(doctors);
      }
  };
  
  useEffect(() => {
      filterSpeciality();
 
  }, [ doctors, speciality]);

  return (
    <div className="text-center">
      <p className="text-gray-600">Browse through the doctor speciality.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`} onClick={ () => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}>Dermatologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`} onClick={ () => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}>Gastroenterologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-100 text-black" : ""}`} onClick={ () => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')}>General Physician</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`} onClick={ () => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}>Gynecologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`} onClick={ () => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}>Pediatricians</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`} onClick={ () => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}>Neurologist</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {
            filterDoc.map(
              (
                item
              ) => (
                <div
                 key={item.id} // Added key prop for list items
                 className="relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                  onClick={ () => navigate(`/appointment/${item.id}`)}
                >
                  <img className="bg-blue-50" src={item.image} alt="doctor" />
                  <div className="p-4">
                    <div className="flex items-center bg-primary-500 rounded-full">
                      {" "}
                      {/* Doctors' availability status */}
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <p>Available</p>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate z-20">
                      {item.name} 
                    </h3>
                    <p className="text-sm text-gray-500 truncate z-20">
                      {item.speciality} 
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
