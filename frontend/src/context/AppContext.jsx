import React, { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { doctors } from "../assets/assets_frontend/assets";

// Create the context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // You can initialize the context value with the doctors data or any other state
  const [data, setData] = useState(doctors); 

  // Define the value to be passed to context
  const value = { data, setData };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Define prop types
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Specify that children is required
};

export default AppContextProvider;