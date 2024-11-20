import React from "react";
import Header from "../components/Header";
import SpecialityItems from "../components/SpecialityItems";
import TopSpecialist from "../components/TopSpecialist";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="home">
    <Header />
    <SpecialityItems />
    <TopSpecialist />
    <Banner />
    </div>
  );
};

export default Home;
