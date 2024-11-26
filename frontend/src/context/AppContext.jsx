import React, { createContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { doctors } from "../assets/assets_frontend/assets";

// Create the context
export const AppContext = createContext();

const current ='$';

const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ doctors, current }}>
      {children}
    </AppContext.Provider>
  );
};

// Define PropTypes for AppContextProvider
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;