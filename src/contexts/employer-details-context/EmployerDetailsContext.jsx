import React, { createContext, useEffect, useState } from "react";

const globalContext = createContext(undefined);

function EmployerDetilsContext({ children }) {
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchHandle = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/employer-all-details",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const allDetails = await response.json();
      setProfileDetails(allDetails.body);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    }
  };
  return (
    <globalContext.Provider
      value={{
        profileDetails,
        setProfileDetails,
        loading,
        setLoading,
        error,
        setError,
        fetchHandle,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export { EmployerDetilsContext, globalContext };
