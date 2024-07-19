import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/nav-bar/Navbar";
import UserProfileList from "../../components/community/user-profile-list/UserProfileList";
import ChatPage from "../../components/community/chat-page/ChatPage";
import { globalContextChat } from "../../contexts/chat-context/ChatContext";
import { globalContext } from "../../contexts/employer-details-context/EmployerDetailsContext";
import SearchBar from "../../components/search-bar/SearchBar";

function Community() {
  const [onlineUsers, setOnlineUser] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const {
    socket,
    selected,
    setSelected,
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    fetchHandler,
  } = useContext(globalContextChat);

  const { profileDetails, fetchHandle } = useContext(globalContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchHandler();
  }, []);

  useEffect(() => {
    fetchHandle();
    const currentUser = profileDetails?.email;
    setUser(profileDetails);
    const filteredUSer = users.filter((item) => item.email !== currentUser);

    setUsers(filteredUSer);
  }, []);

  useEffect(() => {
    socket.emit("join_chat", {
      sender: profileDetails.name,
      receiver: selectedUser,
      room: [profileDetails.name, selectedUser].sort().join("_"),
    });
  }, [selected]);

  console.log(users , "-------------<<");

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Navbar />
      <div className="w-4/5  h-4/5  mt-10  flex gap-2 flex-col items-center justify-center relative ">
        <section className="w-max h-max text-black bg-white  p-5  flex gap-8 flex-col  items-center justify-center  absolute left-0 top-10 shadow-md rounded-xl ">
          <h1 className="text-center  ">Community</h1>
          <ul className="w-full flex gap-5 flex-col items-center justify-center  ">
            <li
              onClick={() => setSelected(0)}
              className={`"w-full text-center text-black bg-zinc-50 font-semibold px-5 p-1 border  rounded-full hover:border-blue-700 transition-colors cursor-pointer" ${
                !selected && "bg-zinc-100 border-blue-600"
              } `}
            >
              Users
            </li>
            <li
              onClick={() => setSelected(1)}
              className={`"text-center text-black bg-zinc-50 font-semibold  px-5 p-1 border  rounded-full hover:border-blue-700 transition-colors cursor-pointer"  ${
                selected && "bg-zinc-100 border-blue-600"
              } `}
            >
              Chats
            </li>
          </ul>
        </section>

        {!selected ? (
          <div className="w-[75%] h-[90%] p-3  flex gap-4 flex-col items-center   rounded-lg shadow-lg overflow-y-auto">
            <SearchBar setSearchInput={setSearchInput} />
            {users
              .filter((item) =>
                searchInput !== ""
                  ? item.name.toLowerCase().includes(searchInput.toLowerCase())
                  : users
              )
              .map((data, index) => (
                <UserProfileList
                  {...data}
                  key={index}
                  setSelectedUser={setSelectedUser}
                  setSelected={setSelected}
                />
              ))}
          </div>
        ) : (
          <div className="w-[75%] h-[90%]  p-3  flex gap-4 flex-col items-end justify-center  rounded-lg  overflow-y-auto">
            <ChatPage selectedUser={selectedUser} user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Community;
