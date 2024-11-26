import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import AOS from 'aos'; // Correctly import AOS

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { speciality } = useParams();

  const specialties = [
    'Dermatologist', 'Gastroenterologist', 'General Physician',
    'Gynecologist', 'Pediatrician', 'Neurologist'
  ];

  useEffect(() => {
    AOS.init(); // Initialize AOS
    filterSpeciality();
  }, [doctors, speciality]);

  const filterSpeciality = () => {
    if (doctors && doctors.length) {
      const decodedSpeciality = speciality ? decodeURIComponent(speciality.replace(/-/g, ' ')) : null;
      setFilterDoc(
        decodedSpeciality ? doctors.filter(doc => doc.speciality === decodedSpeciality) : doctors
      );
    }
  };

  const handleNavigation = (selectedSpecialty) => {
    const targetPath = selectedSpecialty === speciality ? '/doctors' : `/doctors/${selectedSpecialty.replace(/ /g, '-')}`;
    navigate(targetPath, { replace: true });
  };

  return (
    <div className="text-center">
      <p className="text-gray-600">We Are A Certified and Award Winning Dental Clinic You Can Trust - Browse through the doctor specialty.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specialties.map((specialty) => (
            <p
              key={specialty}
              className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality?.replace(/-/g, ' ') === specialty ? 'bg-indigo-100 text-black' : ''}`}
              onClick={() => handleNavigation(specialty)} 
              aria-label={`Navigate to ${specialty} doctors`}
            >
              {specialty}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => (
              <div
                key={item.id}
                className="relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                onClick={() => navigate(`/appointment/${item.id}`)}
                data-aos="fade-zoom-in"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img className="bg-blue-50" src={item.image} alt={`Doctor ${item.name}`} />
                <div className="p-4">
                  <div className="flex items-center bg-primary-500 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <p>Available</p>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found for this specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;