import React from "react";
import Header from "../components/Header";
import TopSpecialist from "../components/TopSpecialist";
import Banner from "../components/Banner";
import Services from "../components/Services";

const Home = () => {
  return (
    <div className="home">
    <Header />
    <Services />
    <TopSpecialist />
    <Banner />
    </div>
  );
};

export default Home;
