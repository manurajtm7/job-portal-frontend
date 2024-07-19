import React, { useContext } from "react";
import { globalContext } from "../../contexts/job-list-context/JobListContext";
import { useParams } from "react-router-dom";

function JobAllData() {
  const { jobsList } = useContext(globalContext);

  const params = useParams();
  const parameterId = params.id.split(":")[1];
  const filterData = jobsList.filter((item) => item._id === parameterId)[0];

  //   const date = new Date(filterData["createdAt"]);
  //   const formattedDate = date.toLocaleTimeString()
  //   console.log(formattedDate);

  console.log(filterData.employerDetails._id, "ëmpp");
  const hanldeSubmit = async () => {
    const response = await fetch("http://localhost:4000/job-application-send", {
      method: "POST",
      body: JSON.stringify({
        jobId: filterData._id,
        postedUserId: filterData.employerDetails._id,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      alert(
        "sucessfully applied to the job on",
        filterData["jobTitle"],
        "post"
      );
    } else {
      alert("something wrong with application or check user validation");
    }
  };

  console.log(filterData);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="w-[60%]  grid gap-5 grid-cols-2 bg-zinc-50 p-10 shadow-xl rounded-xl  ">
        <div className="grid gap-5">
          <div className="w-4/5">
            <h1 className="text-xl font-bold text-blue-600">
              {filterData?.jobTitle || "fetching..."}
            </h1>
            <h1 className="mt-4">
              {filterData?.jobDescription || "fetching..."}
            </h1>
          </div>
          <div className="w-max h-max flex gap-3 items-center justify-center">
            <h1 className="font-semibold"> Salary : {filterData?.salary} Rs</h1>
            <h1 className=" w-max text-black   hover:bg-zinc-300 font-semibold px-4 p-1 border-2 border-zinc-500  rounded-full ">
              Location : {filterData?.location}
            </h1>
          </div>
        </div>
        <div className="grid ">
          <div className="flex gap-2 flex-col items-start justify-center">
            <h1>
              Expected joining date :{" "}
              <span className="font-semibold">{filterData?.expectedDate}</span>
            </h1>

            <h1 className="text-xs font-semibold">
              Job posted date : {filterData?.createdAt}
            </h1>
          </div>
          <button
            onClick={hanldeSubmit}
            className="w-max h-max text-zinc-200 font-semibold border-4 border-blue-200 bg-blue-500 hover:text-white hover:bg-blue-600  hover:scale-110  rounded-lg mt-5 p-1 px-8 transition-transform"
          >
            Apply Now
          </button>
        </div>

        <div>
          <p>
            <span className="text-xs">Job posted person name :</span>
            <span className="font-semibold ml-2">
              {filterData?.employerDetails?.name}
            </span>
          </p>
          <p>
            <span className="text-xs">Job posted person mail id :</span>
            <span className="font-semibold ml-2">
              {filterData?.employerDetails?.email}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobAllData;
