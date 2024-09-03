import React from "react";
import profileImage from "../../assets/character-images/user.png";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RequestCard({ data, setChange }) {
  const navigate = useNavigate();
  console.log("data -> ", data);

  const hanldeRemoveRequest = async () => {
    const response = await fetch("http://localhost:4000/chat-request", {
      method: "DELETE",
      body: JSON.stringify({ requestId: data.chat_req_user_merge._id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      toast.success("request removed successfully");
      setChange((prev) => !prev);
    } else toast.error(" somthing wrong with request send");
  };

  const handleAcceptRequest = async () => {
    const response = await fetch("http://localhost:4000/chat-request", {
      method: "PUT",
      body: JSON.stringify({ requestId: data.chat_req_merge._id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      toast.success("request accepted");
      setChange((prev) => !prev);
    } else toast.error(" somthing wrong with request send");
  };

  return (
    <div className="w-1/2 h-36 bg-zinc-100 rounded-lg shadow p-3 flex gap-5 items-center justify-around">
      <div className="w-1/2  flex gap-1 flex-col">
        <div className="w-max flex gap-3 items-center justify-center">
          <img
            src={data.chat_req_user_merge.profileImage || profileImage}
            alt="user profile"
            className="w-5 h-5"
          />
          <span className="text-lg font-semibold">
            {data.chat_req_user_merge.name}
          </span>
        </div>
        <span className="text-sm ">{data.chat_req_user_merge.email}</span>
        <span className="text-sm text-blue-700 font-bold">
          {data.chat_req_user_merge.EmployerDetails
            ? "Employer"
            : "Joob seeker"}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div>
          <button
            onClick={() =>
              navigate(`/view-profile/:${data.chat_req_user_merge._id}`)
            }
            className="text-white bg-blue-600 px-3 p-1 rounded-md "
          >
            View profile
          </button>
        </div>
        <div className="flex gap-4 mt-5">
          <button
            onClick={handleAcceptRequest}
            className="text-black border-2 border-green-400 px-2 p-1 rounded-md "
          >
            <Check />
          </button>
          <button
            onClick={hanldeRemoveRequest}
            className="text-black border-2 border-red-400 px-2 p-1 rounded-md "
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;
