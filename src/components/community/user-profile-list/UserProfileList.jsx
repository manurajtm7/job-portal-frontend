import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import React from "react";
import profileImage from "../../../assets/character-images/user.png";
import { useNavigate } from "react-router-dom";

function UserProfileList({
  _id,
  name,
  email,
  createdAt,
  EmployerDetails,
  setSelectedUser,
  setSelected,
}) {
  const navigate = useNavigate();
  const handleSelectedUser = () => {
    setSelectedUser(name);
    setSelected(1);
  };

  return (
    <li className="w-1/2 bg-zinc-50 rounded-lg px-8 py-3 shadow ">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-14 h-14 rounded-full"
            src={profileImage}
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate flex gap-2 ">
            {name || "Fetching"}
            {EmployerDetails && (
              <span title="employer badge">
                <ShieldCheck className="text-blue-900" />
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500 truncate ">
            {email || "Fetching"}
          </p>
        </div>
        <div className="inline-flex gap-8 items-center text-base font-semibold text-gray-900 ">
          <ArrowUpRight
            className="cursor-pointer"
            onClick={() => navigate(`/view-profile/:${_id}`)}
          />
          <MessageCircle
            className="cursor-pointer"
            onClick={handleSelectedUser}
          />
        </div>
      </div>
    </li>
  );
}

export default UserProfileList;
