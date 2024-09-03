import React, { useEffect, useState } from "react";
import LoadingAnimation from "../../../components/loading-status/loading-animation/LoadingAnimation";
import profileImage from "../../../assets/character-images/user.png";
import Navbar from "../../../components/nav-bar/Navbar";

import { BriefcaseBusiness, MapPin, Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import ProfileViewer from "../../../components/profile-viewer/ProfileViewer";

function EmployerViewProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [changes, setChange] = useState(false);
  const [imageClose, setImageClose] = useState(false);
  const location = useLocation();

  const jobSeekerId = location.pathname.split(":")[1];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchHandler = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/user-profile-view", {
        method: "POST",
        signal: signal,
        body: JSON.stringify({ _id: jobSeekerId }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setProfile(data.body);
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchHandler();

    () => controller.abort();
  }, [changes]);

  const handleSendRequest = async () => {
    const response = await fetch("http://localhost:4000/chat-request", {
      method: "POST",
      body: JSON.stringify({ personId: jobSeekerId }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      toast.success("request send successfully");
    } else
      toast.error(
        "Your request is already send / somthing wrong with request send"
      );
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center body">
      <ToastContainer />
      {imageClose && (
        <ProfileViewer
          imageUrl={profile?.personalDetails?.profilePicture}
          setClose={setImageClose}
        />
      )}
      {!loading ? (
        <div className="w-screen h-screen  flex flex-col sm:flex-row  gap-10 items-center justify-start ">
          <Navbar />
          <div className="w-screen sm:w-1/4 min-h-screen bg-blue-50  bg-opacity-50 border   rounded-lg  flex flex-col gap-4 items-center justify-center">
            <div className="w-4/5 flex gap-10 flex-col items-center  ">
              <div className="w-32 h-32 grid place-items-center overflow-hidden">
                <img
                  src={profile?.personalDetails?.profilePicture || profileImage}
                  alt="profile image"
                  className=" w-full h-full border-2 border-white rounded-full object-cover"
                  onClick={() => setImageClose((prev) => !prev)}
                />
              </div>
              <div className="text-center">
                <div className="grid gap-2">
                  <p className="text-xl font-medium capitalize">
                    {profile?.name}
                  </p>
                  <p>{profile?.email}</p>
                  <p className="text-xs">
                    {new Date(profile?.createdAt).toLocaleString()}
                  </p>
                </div>
                {profile?.EmployerDetails && (
                  <div className="mt-5">
                    <h1 className="text-lg font-semibold mb-5">
                      Company details
                    </h1>
                    <p className="text-white text-sm font-medium  bg-zinc-800  mb-1 p-2 px-3 rounded-md text-ellipsis ">
                      {profile?.EmployerDetails?.companyName}
                    </p>
                    <p className="text-white text-sm font-medium  bg-zinc-800  mb-1 p-2 px-3 rounded-md flex gap-2 items-center justify-center ">
                      <BriefcaseBusiness size={16} />
                      {profile?.EmployerDetails?.designation}
                    </p>
                    <p className="text-white text-sm font-medium  bg-zinc-800  mb-1 p-2 px-3 rounded-md flex gap-2 items-center justify-center ">
                      <MapPin size={16} /> {profile?.EmployerDetails?.location}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-max h-max  sm:h-[85%] p-5 flex flex-col ">
            <div>
              <h1 className="text-xl font-semibold p-2 border-b-2 border-zinc-300 mb-5">
                Skills
              </h1>
              <ul className=" py-1 grid gap-3 grid-cols-3  overflow-auto ">
                {profile?.Skills?.map((data, index) => (
                  <li
                    key={index}
                    className="min-w-max text-zinc-700 font-semibold  border border-zinc-500  rounded-full text-center p-1 px-4   "
                  >
                    {data}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {profile?.isRequestAvail && (
                <div title="send chat request ">
                  <button
                    onClick={handleSendRequest}
                    className="text-black  p-1 px-3 border-2 rounded-md flex gap-3 items-center justify-center hover:bg-zinc-400"
                  >
                    Send a request
                    <Send size={16} />
                  </button>
                </div>
              )}
            </div>
            <div className="w-full flex gap-4 flex-col py-5  ">
              <h2 className="text-xl font-semibold text-gray-700">
                Personal Details
              </h2>
              <p>
                <strong>Age:</strong> {profile?.personalDetails?.age}
              </p>
              <p>
                <strong>Date of Birth:</strong> {profile?.personalDetails?.dob}
              </p>
              <p>
                <strong>Hobbies:</strong> {profile?.personalDetails?.hobbies}
              </p>
              <p>
                <strong>Interests:</strong>{" "}
                {profile?.personalDetails?.interests}
              </p>
              <p>
                <strong>Habits:</strong> {profile?.personalDetails?.habits}
              </p>
              <p>
                <strong>Qualification:</strong>
                {profile?.personalDetails?.qualification}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}

export default EmployerViewProfile;
