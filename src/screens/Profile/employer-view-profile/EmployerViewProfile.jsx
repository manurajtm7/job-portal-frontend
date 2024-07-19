import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../components/loading-status/loading-animation/LoadingAnimation";
import profileImage from "../../../assets/character-images/user.png";

function EmployerViewProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobSeekerId = location.pathname.split(":")[1];
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchHandler = async () => {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/employer-profile-view",
        {
          method: "POST",
          signal: signal,
          body: JSON.stringify({ _id: jobSeekerId }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

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
  }, []);

  console.log(profile);

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center ">
      {!loading ? (
        <div className="w-full h-full">
          <div className="w-full h-1/3 bg-blue-50 bg-opacity-50 flex gap-4 items-center justify-center">
            <div className="w-4/5 flex gap-10 items-center  ">
              <div className="w-32 h-32 ">
                <img
                  src={profileImage}
                  alt="profile image"
                  className="border-2 border-white rounded-full"
                />
              </div>
              <div className="">
                <div>
                  <p className="text-lg font-medium">{profile?.name}</p>
                  <p>{profile?.email}</p>
                  <p className="text-xs">
                    {new Date(profile?.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="mt-4">
                  <ul className="h-18 py-1 grid gap-3 grid-cols-3  overflow-auto ">
                    {profile?.Skills?.map((data, index) => (
                      <li
                        key={index}
                        className="text-white font-semibold bg-blue-600 border   rounded-full text-center p-1 px-4   "
                      >
                        {data}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid place-items-center">
            <div className="w-4/5 flex gap-4 flex-col py-5  ">
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
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="w-max text-white font-semibold bg-blue-600 px-3 p-1 rounded-md"
              >
                Back to hire
              </button>
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
