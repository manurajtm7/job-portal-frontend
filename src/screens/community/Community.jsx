import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/nav-bar/Navbar";
import UserProfileList from "../../components/community/user-profile-list/UserProfileList";
import ChatPage from "../../components/community/chat-page/ChatPage";
import SearchBar from "../../components/search-bar/SearchBar";
import SelectionBar from "../../components/community/selection-bar/SelectionBar";
import { ToastContainer } from "react-toastify";
import { globalContextChat } from "../../contexts/chat-context/ChatContext";
import { globalContext } from "../../contexts/employer-details-context/EmployerDetailsContext";

function Community() {
  const [searchInput, setSearchInput] = useState("");
  const [list, setList] = useState([]);
  const [user, setUser] = useState({});

  const {
    socket,
    selected,
    setSelected,
    users,
    selectedUser,
    setSelectedUser,
    fetchHandler,
  } = useContext(globalContextChat);

  const { profileDetails, fetchHandle } = useContext(globalContext);

  useEffect(() => {
    fetchHandler();
    fetchHandle();
    setList(users);
  }, []);

  useEffect(() => {
    socket.emit("join_chat", {
      sender: profileDetails?._id,
      receiver: selectedUser?._id,
      room: [profileDetails?.name, selectedUser?.name].sort().join("_"),
    });


  }, [selected, socket, selectedUser]);

  useEffect(() => {
    let timeOut;

    timeOut = setTimeout(() => {
      clearTimeout(timeOut);

      if (searchInput == "") {
        setList(users);
      } else {
        setList(
          users.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
      }
    }, 500);

    () => clearTimeout(timeOut);
  }, [searchInput, users]);

  return (
    <div className="w-full h-screen   flex flex-col items-center sm:items-center  justify-center">
      <div className="w-full h-32 ">
        <Navbar />
      </div>
      <div className="w-full md:w-full  h-[90%] md:h-[85%]     flex gap-2 flex-col items-center justify-center relative ">
        <div className="md:hidden w-[95%] h-full  flex flex-col items-center justify-center">
          <SelectionBar selected={selected} setSelected={setSelected} />
          {!selected ? (
            <div className="w-full  sm:w-[75%] h-[90%]   flex gap-4 flex-col items-center   rounded-lg overflow-x-hidden overflow-y-auto">
              <SearchBar setSearchInput={setSearchInput} />
              {list.length > 0 ? (
                list.map((data, index) => (
                  <UserProfileList
                    {...data}
                    key={index}
                    setSelectedUser={setSelectedUser}
                    setSelected={setSelected}
                  />
                ))
              ) : (
                <span className="text-sm opacity-65">No users found...</span>
              )}
            </div>
          ) : (
            <div className="w-full  sm:w-[75%]  h-full sm:h-[90%]    flex gap-4 flex-col items-end justify-center  rounded-lg  overflow-y-auto">
              <ChatPage selectedUser={selectedUser} user={user} />
            </div>
          )}
        </div>

        <div className=" w-full h-full hidden   md:flex items-center justify-center">
          <div className="w-full  md:w-max h-[90%] md:h-full  p-3  flex gap-4 flex-col items-center   rounded-lg overflow-x-hidden overflow-y-auto">
            <SearchBar setSearchInput={setSearchInput} />
            {list.length > 0 ? (
              list.map((data, index) => (
                <UserProfileList
                  {...data}
                  key={index}
                  setSelectedUser={setSelectedUser}
                  setSelected={setSelected}
                />
              ))
            ) : (
              <span className="text-sm opacity-65">No users found...</span>
            )}
          </div>
          <div className="w-full  sm:w-[75%]  h-full     p-3 flex   items-center justify-center    overflow-y-auto">
            <ChatPage selectedUser={selectedUser} user={user} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Community;
