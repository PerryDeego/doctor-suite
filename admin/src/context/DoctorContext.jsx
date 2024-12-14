import { createContext } from "react";

// Create the context
export const DoctorContext = createContext();

const DoctorContextProvider = ( props ) => {

    const value = {

    };

    return (
        <DoctorContext.Provider value={ value }>
            { props.children }
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;