import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
    const { doctors, specialties } = useContext(AppContext);
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false); 
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const navigate = useNavigate();

    // Function to filter doctors based on the selected specialty
    const filterSpeciality = () => {
        if (selectedSpecialty) {
            setFilterDoc(doctors.filter(doc => doc.speciality === selectedSpecialty));
        } else {
            setFilterDoc(doctors);
        }
    };

    // useEffect to filter doctors whenever the doctors list or selected specialty changes
    useEffect(() => {
        filterSpeciality();
    }, [doctors, selectedSpecialty]);

    // Function to handle clicks on specialty options
    const handleSpecialtyClick = (specialty) => {
        if (selectedSpecialty === specialty) {
            setSelectedSpecialty(null);
        } else {
            setSelectedSpecialty(specialty);
            navigate(`/doctors/${specialty}`);
        }
    };

    return (
        <div className="text-center py-10">
            <h2 className="text-4xl sm:text-5xl leading-normal font-extrabold tracking-tight text-gray-900">
                MEET OUR <span className="text-primary">SPECIALISTS</span>
            </h2>
            <p className="text-gray-600">Browse through our experienced doctor specialties</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                
                {/* Specialty selection section */}
                <div className={`flex flex-col sm:flex-row items-start gap-5`}>
                    {/* Always show specialties on larger screens */}
                    <div className={`hidden sm:flex flex-col gap-4 text-sm text-gray-600`}>
                    {/* Button for large view (read-only) */}
                <div className="hidden md:block mb-4">
                    <button 
                        className={`border rounded text-primary p-2 transition-all ${selectedSpecialty ? 'bg-primary-gradient text-white' : ''}`} 
                        disabled={true} // Make it read-only in large view
                    >
                        Filter Specialty Here
                    </button>
                </div>

                        {specialties.map((spec) => (
                            <p
                                key={spec}
                                className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:text-primary ${selectedSpecialty === spec ? "bg-indigo-100 text-black" : ""}`}
                                onClick={() => handleSpecialtyClick(spec)}
                            >
                                {spec}
                            </p>
                        ))}
                    </div>

                    {/* Button for mobile view */}
                    <button 
                        className={`border rounded text-primary p-2 transition-all sm:hidden ${showFilter ? 'bg-primary-gradient text-white' : ''}`} 
                        onClick={() => setShowFilter(prev => !prev)}
                    >
                        Filter Specialty Here
                    </button>
                </div>

                {/* Show specialties only when showFilter is true for mobile view */}
                {showFilter && (
                    <div className="flex flex-col gap-4 text-sm text-gray-600 sm:hidden">
                        {specialties.map((spec) => (
                            <p
                                key={spec}
                                className={`w-[94vw] pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:text-primary ${selectedSpecialty === spec ? "bg-indigo-100 text-black" : ""}`}
                                onClick={() => handleSpecialtyClick(spec)}
                            >
                                {spec}
                            </p>
                        ))}
                    </div>
                )}
                
                {/* Doctors listing section */}
                <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                    {filterDoc.length > 0 ? (
                        filterDoc.map(item => (
                            <div 
                                key={item.id}
                                className="relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" 
                                onClick={() => navigate(`/appointment/${item.id}`)}
                            >
                                <img className="bg-blue-50" src={item.image} alt={`${item.name} - ${item.speciality}`} />
                                <div className="p-4">
                                    <div className="flex items-center bg-primary-500 rounded-full">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        <p>Available</p>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 truncate z-20">{item.name}</h3>
                                    <p className="text-sm text-gray-500 truncate z-20 hover:text-primary">{item.speciality}</p>
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
