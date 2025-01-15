import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Services = () => {
  const { assets, specialityData = [] } = useContext(AppContext) || {};

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="py-16 text-gray-800" id="speciality">
      <div className="container mx-auto text-center">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">We Offer Different Services To Improve Your Health</h2>
          <img src={assets.section_img} alt="Health services" className="mb-4 mx-auto" />
          <p className="text-gray-600">Patients can access a variety of services, including routine check-ups, diagnostic tests, treatments, and specialized procedures, all under one roof.</p>
        </div>

        <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
          <h1 className="text-3xl font-medium">Find by Speciality</h1>
          <p className="sm:w-1/3 text-center sm:text-sm mb-5">
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointment hassle-free.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-3 sm:px-0">
            {specialityData.length > 0 ? (
              specialityData.map((item, index) => (
                <Link
                  key={item.id || index} // Use item.id if available, otherwise fallback to index
                  to={`/doctors/${item.speciality}`}
                  onClick={handleScrollToTop}
                  className="flex flex-col items-center text-sm cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="icon rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={`Speciality in ${item.speciality}`}
                    />
                  </span>
                  <h4 className="text-lg font-medium text-primary">{item.speciality}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600">{item.doctors} doctors available</p>
                  <p className="text-gray-600">{item.appointments} appointments scheduled</p>
                </Link>
              ))
            ) : (
              <p className='text-lg text-center font-medium text-primary'>No specialities available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;