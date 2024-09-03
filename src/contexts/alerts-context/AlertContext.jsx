import React, { createContext } from "react";
import { io } from "socket.io-client";

const globalContextAlerts = createContext(undefined);

const SOCKET_URL = "http://localhost:5000";
export const socket = io.connect(SOCKET_URL);

function AlertProvider({ children }) {
  return (
    <globalContextAlerts.Provider
      value={{
        socket,
      }}
    >
      {children}
    </globalContextAlerts.Provider>
  );
}

export { AlertProvider, globalContextAlerts };
