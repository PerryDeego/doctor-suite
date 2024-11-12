import React from "react";
import Header from "../components/Header";
import SpecialityItems from "../components/SpecialityItems";
import TopSpecialist from "../components/TopSpecialist";

const Home = () => {
  return (
    <div className="home">
    <Header />
    <SpecialityItems />
    <TopSpecialist />
    </div>
  );
};

export default Home;
