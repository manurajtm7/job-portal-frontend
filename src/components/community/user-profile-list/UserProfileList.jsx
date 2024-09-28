import { ArrowUpRight, BadgeCheck, MessageCircle } from "lucide-react";
import React, { useContext } from "react";
import profileImage from "../../../assets/character-images/user.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { globalContext } from "../../../contexts/employer-details-context/EmployerDetailsContext";
import "./profile-list-style.css";

function UserProfileList({
  _id,
  name,
  email,
  createdAt,
  personalDetails,
  isRequestAvail,
  EmployerDetails,
  setSelectedUser,
  setSelected,
  ...restData
}) {
  const navigate = useNavigate();
  const { profileDetails } = useContext(globalContext);

  const handleSelectedUser = () => {
    if (
      !isRequestAvail ||
      restData?.ChatRequests.includes(profileDetails?._id)
    ) {
      setSelectedUser({
        _id,
        name,
        email,
      });
      setSelected(1);
    } else {
      toast.warn("Please send a request to chat with this person");
    }
  };

  return (
    <li className="w-full md:w-full  bg-zinc-50 rounded-lg px-8 py-3 shadow list-none  ">
      <div className="flex items-center space-x-4  ">
        <div
          className={`flex-shrink-0 shadow rounded-full relative overflow-hidden `}
        >
          <img
            className="w-14 h-14 rounded-full"
            src={personalDetails?.profilePicture || profileImage}
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate flex gap-2 items-center justify-start ">
            {name || "Fetching"}
            {EmployerDetails && (
              <span title="employer badge">
                <BadgeCheck size={18} className="text-blue-600 " />
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
