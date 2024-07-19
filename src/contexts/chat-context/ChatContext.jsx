import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie" 


const globalContextChat = createContext(undefined);

const SOCKET_URL = "http://localhost:4000";
export const socket = io.connect(SOCKET_URL, {
  extraHeaders: {
    "token": Cookies.get("token"),
  },
});

function ChatProvider({ children }) {
  const [selected, setSelected] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const fetchHandler = async () => {
    const response = await fetch("http://localhost:4000/users-list", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setUsers(data.body);
    } else {
      alert("something wrong with application or check user validation");
    }
  };
  return (
    <globalContextChat.Provider
      value={{
        socket,
        selected,
        setSelected,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        fetchHandler,
      }}
    >
      {children}
    </globalContextChat.Provider>
  );
}

export { ChatProvider, globalContextChat };
