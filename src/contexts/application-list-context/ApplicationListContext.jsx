import React, { createContext, useState } from "react";

const globalContext = createContext(undefined);

function ApplicationContext({ children }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJobAlerts = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/job-application-list", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const jobAlerts = await response.json();
      setApplications(jobAlerts?.body);
      setLoading(false);
      setError(false);
    } else {
      setTimeout(() => setLoading(false), 3000);
      setError(true);
    }
  };

  return (
    <globalContext.Provider
      value={{
        applications,
        setApplications,
        fetchJobAlerts,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export { ApplicationContext, globalContext };
