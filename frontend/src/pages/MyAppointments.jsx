import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors, specialityData } = useContext(AppContext);
  const [specialties, setSpecialties] = useState([]);

  const filterSpecialities = (doctorSpeciality) => {
    return specialityData.filter(spec => spec.speciality === doctorSpeciality);
  };

  useEffect(() => {
    const updatedSpecialties = doctors.map(doctor => {
      return {
        ...doctor,
        matchedSpecialities: filterSpecialities(doctor.speciality),
      };
    });
    setSpecialties(updatedSpecialties);
  }, [doctors, specialityData]);

  return (
    <div className="text-center mt-10 px-4 sm:px-0">
      <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 mb-10">
        My <span className="text-primary">Appointments</span>
      </h3>

      <div className="text-gray-500">
        {specialties.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="appointment-card border border-gray-200 rounded-lg shadow-md p-6 mb-4 bg-white"
          >
            <div className="flex flex-col sm:flex-row items-center">
              <div className="mb-4 sm:mb-0">
                {/* Increased image size for mobile view */}
                <img
                  src={item.image}
                  alt={`${item.name}`}
                  className="w-32 sm:w-32 md:w-44 rounded-full object-cover" 
                />
              </div>

              <div className="flex-1 text-sm text-zinc-600 mx-4">
                <h4 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
                  {item.name}
                </h4>
                <p className="text-gray-600">{item.speciality}</p>
                <h4 className="font-semibold">Address:</h4>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
                <p>
                  <span className="font-semibold">Date & Time:</span> Dec 29, 2024 | 4:30 PM
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="flex flex-col space-y-2">
                  <div className="mt-2">
                    {item.matchedSpecialities.map((specialty) => (
                      <div key={specialty.speciality} className="flex items-center">
                        <img
                          src={specialty.image}
                          alt={specialty.speciality}
                          className="w-16 h-16 rounded-full mr-2" 
                        />
                        <span className="text-gray-600">{specialty.speciality}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <button className="new-btn-d inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
                      Pay Online
                    </button>
                    <button className="new-btn-d inline-block px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition duration-300">
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;