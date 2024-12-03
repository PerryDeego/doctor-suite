import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityItems = () => {
  // Function to scroll to the top of the page
  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to top when clicking a speciality
  };

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center sm:text-sm">
        Simply browse through our extensive list of trusted doctors,{" "}
        <br className="hidden sm:block" /> schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto">
        {specialityData.length > 0 ? (
          specialityData.map((item) => (
            <Link
              className="flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:translate-y-[10px] transition-all duration-500"
              key={item.id} // Unique key prop for each element
              to={`/doctors/${item.speciality}`}
              onClick={handleScrollToTop}
            >
              <img
                className="w-16 sm:w-24 mb-4"
                src={item.image}
                alt={`Speciality in ${item.speciality}`} // Descriptive alt text
              />
              <p className="hover:text-primary">{item.speciality}</p>
            </Link>
          ))
        ) : (
          <p>No specialities available at the moment.</p> // Message when no specialties are found
        )}
      </div>
    </div>
  );
};

export default SpecialityItems;