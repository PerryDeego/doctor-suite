import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
    const { doctors, specialties } = useContext(AppContext); 
    const [filterDoc, setFilterDoc] = useState([]);
    const navigate = useNavigate();
    const { speciality } = useParams();

    // Function to filter doctors based on the selected specialty
    const filterSpeciality= () => {
        console.log(`SPECIALITY: ${speciality}`)
        if (speciality) {
          setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        } else {
          setFilterDoc(doctors);
        }
    };

    // useEffect to filter doctors whenever the doctors list or selected specialty changes
    useEffect(() => {
        filterSpeciality();
    }, [doctors, speciality]);

    // Function to handle clicks on specialty options
    const handleSpecialtyClick = (specialty) => {
        navigate(`/doctors/${specialty}`); // Properly navigating to lower case specialty
    };

    return (
        <div className="text-center">
            <p className="text-gray-600">Browse through the doctor specialty.</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                {/* Specialty selection section */}
                <div className="flex flex-col gap-4 text-sm text-gray-600">
                    {specialties.map((spec) => (
                        <p
                            key={spec} // Correctly using unique key for mapping
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:text-primary ${speciality === spec ? "bg-indigo-100 text-black" : ""}`}
                            onClick={() => handleSpecialtyClick(spec)} // Handle specialty click
                        >
                            {spec}
                        </p>
                    ))}
                </div>

                {/* Doctors listing section */}
                <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                    {filterDoc.length > 0 ? (
                        filterDoc.map(item => (
                            <div 
                                key={item.id} // Correct usage of id for unique keys
                                className="relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" 
                                onClick={() => navigate(`/appointment/${item.id}`)} // Correctly navigating to the appointment page
                            >
                                {/* Displaying doctor image */}
                                <img className="bg-blue-50" src={item.image} alt={`${item.name} - ${item.speciality}`} />
                                <div className="p-4">
                                    {/* Availability indicator */}
                                    <div className="flex items-center bg-primary-500 rounded-full">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        <p>Available</p>
                                    </div>
                                    {/* Doctor's name */}
                                    <h3 className="text-lg font-semibold text-gray-800 truncate z-20">{item.name}</h3>
                                    {/* Doctor's specialty */}
                                    <p className="text-sm text-gray-500 truncate z-20 hover:text-primary">{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No doctors found for this specialty.</p> // Correctly handling the no results case
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;