import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  const currentDate = new Date().getFullYear();

  const companyLinks = ["Home", "Contact Us", "About Us", "Privacy Policy"];
  const contactInfo = [
    "Phone: +1 656-555-7849",
    "Email: services@specialist.com",
  ];

  return (
    <footer className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        {/* Left Section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Booking a specialist for your professional needs ensures that you
            receive expert guidance and high-quality service tailored to your
            requirements. By scheduling an appointment with one of the best
            professionals in the industry, you gain access to specialized
            knowledge and experience that can significantly enhance the outcomes
            of your endeavors. 
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl text-indigo-600 font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {companyLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl  text-indigo-600 font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {contactInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Information */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright &copy; {currentDate} specialist - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;