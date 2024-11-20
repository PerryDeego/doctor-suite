import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const filterItem = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    filterItem();
  }, [doctors, speciality]);

  return (
    <div className='text-center'>
      <p>Browse through the doctor speciality.</p>
      <div>
        <div>
          <p>Dermatologist</p>
          <p>Gastroenterologist</p>
          <p>General Physician</p>
          <p>Gynecologist</p>
          <p>Pediatricians</p>
          <p>Neurologist</p>
        </div>
        <div className='w-full grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.length > 0 ? (
            filterDoc.map(({ id, image, name, speciality }) => (
              <div
                key={id} // Ensure `id` is unique
                className="relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                onClick={() => navigate(`/appointment/${id}`)}
              >
                {/* Doctor Image */}
                <img
                  className="w-full h-48 object-cover bg-blue-50"
                  src={image}
                  alt={`Doctor ${name}`} // Ensure alt text is descriptive
                  loading="lazy"
                />
                
                {/* Doctor Details with Blue Overlay on Hover */}
                <div className="relative p-4 flex flex-col gap-2">
                  {/* Blue Overlay */}
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  {/* Doctor Info */}
                  <div className="flex items-center gap-2 text-sm text-center text-green-500 z-20">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p>Available</p>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate z-20">{name}</h3>
                  <p className="text-sm text-gray-500 truncate z-20">{speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors available for this specialty.</p> // Message for no doctors
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;