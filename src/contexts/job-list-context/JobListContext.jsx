import React, { createContext, useEffect, useState } from "react";

const globalContext = createContext(undefined);

function JobListContext({ children }) {
  const [jobsList, setJobsList] = useState([]);
  const [currentForm, setCurrentForm] = useState(0);

 

  return (
    <globalContext.Provider
      value={{ jobsList, setJobsList, currentForm, setCurrentForm }}
    >
      {children}
    </globalContext.Provider>
  );
}

export { JobListContext, globalContext };
