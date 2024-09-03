import React, { useContext, useState } from "react";
import { globalContext } from "../../contexts/job-list-context/JobListContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ChevronLeft, Mail, Send, User } from "lucide-react";
import MiniLoader from "../../components/loading-status/mini-loader/MiniLoader";

function JobAllData() {
  const { jobsList } = useContext(globalContext);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();

  const params = useParams();
  const parameterId = params.id.split(":")[1];
  const filterData = jobsList.filter((item) => item._id === parameterId)[0];

  const hanldeSubmit = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/job-application-send", {
      method: "POST",
      body: JSON.stringify({
        jobId: filterData._id,
        postedUserId: filterData.employerDetails,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      toast.success("Successfully applied on job");
      setLoading(false);
    } else {
      toast.success(
        "something wrong with application or check user validation"
      );
      setTimeout(() => {
        setLoading(false);
      }, 8000);
    }
  };

  return (
    <div className="w-full h-full  bg-zinc-50 flex flex-col items-center  xs:justify-center sm:justify-center ">
      <ToastContainer />
      <div
        onClick={() => naviagte(-1)}
        className="w-4/5 mt-5   flex absolute top-5 xs:top-10 cursor-pointer "
      >
        <ChevronLeft /> back
      </div>
      <div className=" w-full sm:w-[60%]  grid gap-5 sm:grid-cols-2   p-10 mt-10 xs:mt-0 sm:shadow-xl rounded-xl overflow-auto ">
        <div className="grid gap-5">
          <div className="w-full sm:w-4/5">
            <h1 className="text-xl font-bold text-zinc-800">
              {filterData?.jobTitle || "fetching..."}
            </h1>
            <h1 className="mt-4">
              {filterData?.jobDescription || "fetching..."}
            </h1>
          </div>
          <div className="w-max h-max flex flex-col sm:flex-row gap-3 sm:items-center justify-center">
            <h1 className="font-semibold"> Salary : {filterData?.salary} Rs</h1>
            <h1 className=" w-max text-black   hover:bg-zinc-300 font-semibold sm:px-4 sm:p-1 sm:border-2 border-zinc-500  rounded-full ">
              Location : {filterData?.location}
            </h1>
          </div>
        </div>
        <div className="grid">
          <div className="flex gap-2 flex-col items-start justify-center">
            <h1 className="text-sm">
              Expected joining date :{" "}
              <span className="font-semibold">{filterData?.expectedDate}</span>
            </h1>

            <h1 className="text-xs font-semibold">
              Job posted date :{" "}
              {new Date(filterData?.createdAt).toLocaleDateString()}
            </h1>
          </div>
          <button
            onClick={hanldeSubmit}
            className="w-max h-max text-zinc-200 font-semibold  bg-blue-600 hover:text-white hover:bg-blue-600  hover:scale-110  rounded-lg mt-5 p-2 px-8 transition-transform"
          >
            {loading ? <MiniLoader /> : "Apply Now"}
          </button>
        </div>

        <div className="flex gap-5 flex-shrink">
          <p className="flex items-center">
            <span className="text-xs">
              <Send size={16} />
            </span>
            <Link
              to={`/view-profile/:${filterData?.employerDetails_merge._id}`}
              className="text-xs font-semibold ml-2"
            >
              view profile
            </Link>
          </p>
          <p className="flex items-center">
            <span className="text-xs">
              <User size={16} />
            </span>
            <span className="font-semibold ml-2">
              {filterData?.employerDetails_merge?.name}
            </span>
          </p>
          <p className="flex items-center justify-start">
            <span className="text-xs">
              <Mail size={16} />
            </span>
            <span className="text-xs font-semibold ml-2">
              {filterData?.employerDetails_merge?.email}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobAllData;
