import React, { useContext, useEffect, useRef, useState } from "react";
import {
  globalContextChat,
  socket,
} from "../../../contexts/chat-context/ChatContext";
import profileImage from "../../../assets/character-images/user.png";
import { globalContext } from "../../../contexts/employer-details-context/EmployerDetailsContext";

function ChatPage({ selectedUser }) {
  const ref = useRef();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { profileDetails } = useContext(globalContext);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (selectedUser) {
      socket.emit("message_send", {
        user_id: socket.id,
        receiverName: selectedUser,
        message: input,
        room: [profileDetails.name, selectedUser].sort().join("_"),
      });

      setMessages((prev) => [...prev, { receiverName: null, message: input }]);
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    ref.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="w-full h-full mx-auto p-4  flex items-end ">
      <div className="w-full h-full bg-white rounded-lg shadow-md p-4 relative">
        <div className="flex items-center mb-4">
          <div className="ml-3">
            <p className="text-xl font-medium">{selectedUser}</p>
            <p className="text-gray-500">Online</p>
          </div>
        </div>

        <div className="w-full h-[75%] overflow-auto p-8">
          {!!selectedUser ? (
            <div>
              {messages.map((data, index) =>
                data.receiverName ? (
                  <div key={index} className="flex flex-col items-start mt-3">
                    <img
                      src={profileImage}
                      alt="Other User Avatar"
                      className="w-8 h-8 rounded-full ml-3"
                    />
                    <p className="text-sm opacity-55">{selectedUser}</p>
                    <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm text-gray-800">{data.message}</p>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex items-end justify-end mt-3">
                    <div>
                      <div className="bg-blue-500 p-3 rounded-lg">
                        <p className="text-sm text-white">{data.message}</p>
                      </div>
                      <p className="text-sm opacity-65 text-end">you</p>
                    </div>
                    <img
                      src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg"
                      alt="Other User Avatar"
                      className="w-8 h-8 rounded-full ml-3"
                    />
                  </div>
                )
              )}
              <div ref={ref}></div>
            </div>
          ) : (
            "Please select a chat"
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="w-full flex items-center  "
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
