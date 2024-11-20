import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  const { group_profiles, arrow_icon, header_img } = assets;

  return (
    <header className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vw] md:mb-[-30px]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img 
            className="w-28" 
            src={group_profiles} 
            alt="Group of doctors" 
            loading="lazy" 
          />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" /> 
            schedule your appointment hassle-free.
          </p>
        </div>
        <a 
          href="#speciality" 
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300"
        >
          Book appointment
          <img 
            className="w-3" 
            src={arrow_icon} 
            alt="Arrow icon" 
            loading="lazy"
          />
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={header_img}
          alt="Hero background"
          loading="lazy"
        />
      </div>
    </header>
  );
};

export default Header;