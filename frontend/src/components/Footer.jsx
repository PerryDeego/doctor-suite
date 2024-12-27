import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { MdLocationOn, MdCall, MdEmail, MdTimer, MdArrowForward } from "react-icons/md"; // Importing icons

const Footer = () => {
  const { assets } = useContext(AppContext);
  const currentDate = new Date().getFullYear();

  const companyLinks = [
    { text: "Home", icon: <MdArrowForward className="text-primary" /> },
    { text: "Contact Us", icon: <MdArrowForward className="text-primary" /> },
    { text: "About Us", icon: <MdArrowForward className="text-primary" /> },
    { text: "Privacy Policy", icon: <MdArrowForward className="text-primary" /> },
  ];

  const contactInfo = [
    { icon: <MdLocationOn className="text-primary" />, text: "542B NS, Medi Town, Worldwide Country" },
    { icon: <MdCall className="text-primary" />, text: "+1 656-555-7849" },
    { icon: <MdEmail className="text-primary" />, text: "services@specialist.com" },
    { icon: <MdTimer className="text-primary" />, text: "Mon - Sat : 9am to 6pm" },
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
          <p className="text-xl text-primary font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {companyLinks.map((link) => (
              <li key={link.id} className="flex items-center">
                {link.icon}
                <span className="ml-2">{link.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl text-primary font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {contactInfo.map((info) => (
              <li key={info.id} className="flex items-center">
                {info.icon}
                <span className="ml-2">{info.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Information */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-primary">
          Copyright &copy; {currentDate} Doctors Suite  - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;