import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../loading-status/loading-animation/LoadingAnimation";
import ProfileImage from "../../../assets/character-images/user.png";
import { globalContext } from "../../../contexts/employer-details-context/EmployerDetailsContext";

function EmployerProfiePage() {
  const {
    profileDetails,
    loading,
    fetchHandle,
  } = useContext(globalContext);
  
  useEffect(() => {
    fetchHandle();
  }, []);

  
  return (
    <div className="w-full h-4/5 bg-tranparent p-5  ">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="container  mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Profile Details</h1>

          <div className="w-full grid  gap-4 grid-cols-2  ">
            <div className="w-full h-full bg-zinc-50 bg-opacity-20  p-4  border border-zinc-200 flex flex-col gap-5  rounded-lg">
              <div className=" bg-blue-500 bg-opacity-5 p-5 rounded-lg grid place-items-center  overflow-hidden">
                <img
                  src={ProfileImage}
                  alt="Profile image"
                  className="w-24 h-24 border-4 border-zinc-200 rounded-full"
                />
              </div>

              <div>
                <div className="mb-2">
                  <strong>Name:</strong> {profileDetails?.name}
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> {profileDetails?.email}
                </div>
                <div className="mb-4">
                  <strong>Created At: </strong>
                  {new Date(profileDetails?.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            {profileDetails.personalDetails ? (
              <div className="w-full  bg-zinc-50 bg-opacity-20   p-5 rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">
                  Personal Details
                </h2>
                <div className="mb-2">
                  <strong>Age:</strong> {profileDetails?.personalDetails?.age}
                </div>
                <div className="mb-2">
                  <strong>Date of Birth:</strong>{" "}
                  {profileDetails?.personalDetails?.dob}
                </div>
                <div className="mb-2">
                  <strong>Hobbies:</strong>{" "}
                  {profileDetails?.personalDetails?.hobbies}
                </div>
                <div className="mb-2">
                  <strong>Interests:</strong>
                  {profileDetails?.personalDetails?.interests}
                </div>
                <div className="mb-2">
                  <strong>Habits:</strong>{" "}
                  {profileDetails?.personalDetails?.habits}
                </div>
                <div className="mb-4">
                  <strong>Qualification:</strong>
                  {profileDetails?.personalDetails?.qualification}
                </div>
              </div>
            ) : (
              <div className="w-full  bg-zinc-50 bg-opacity-20   p-5 flex gap-3 flex-col rounded-lg">
                <span className="text-xl font-bold">
                  please add personal details
                </span>
                <Link to={"/authentication/user-profile"}>
                  <span className="text-blue-500 text-sm font-semibold">
                    click here to update detail
                  </span>
                </Link>
              </div>
            )}

            <div className="w-full  bg-zinc-50 bg-opacity-20  p-5 rounded-lg">
              {profileDetails?.EmployerDetails ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Employer Details
                  </h2>
                  <div className="mb-2">
                    <strong>Company Name :</strong>
                    {profileDetails?.EmployerDetails.companyName}
                  </div>
                  <div className="mb-2">
                    <strong>Desgination:</strong>
                    {profileDetails?.EmployerDetails.designation}
                  </div>
                  <div className="mb-2">
                    <strong>Location:</strong>
                    {profileDetails?.EmployerDetails.location}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Employer Details
                  </h2>
                  <div>No employer details available.</div>
                  <Link
                    to={"/authentication/company-form"}
                    className="text-sm font-semibold text-blue-700"
                  >
                    click here to add company details
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/*  */}
        </div>
      )}
    </div>
  );
}

export default EmployerProfiePage;
