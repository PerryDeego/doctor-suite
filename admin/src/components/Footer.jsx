import React from "react";

const Footer = () => {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="md:mx-10 mt-10">
      {/* Copyright Information */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-primary">
          Copyright &copy; {currentDate} Doctors Suite - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;