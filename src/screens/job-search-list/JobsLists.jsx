import React, { useContext, useEffect, useState } from "react";
import JobPostCard from "../../components/user-home-board-components/jobs-posts/JobPostCard";
import { globalContext } from "../../contexts/job-list-context/JobListContext";
import Navbar from "../../components/nav-bar/Navbar";
import SearchBar from "../../components/search-bar/SearchBar";
import LoadingAnimation from "../../components/loading-status/loading-animation/LoadingAnimation";

function JobsLists() {
  const { jobsList, setJobsList } = useContext(globalContext);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobsList = async () => {
      setLoading(true);

      const response = await fetch("http://localhost:4000/jobs-list", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const jobList = await response.json();
        setJobsList(jobList?.body);
        setLoading(false);
      }
    };
    fetchJobsList();
  }, []);

  return (
    <div className="w-full h-screen  flex gap-10 flex-col items-center justify-center ">
      <Navbar />
      <div className=" w-full h-[80%] mt-8  flex flex-col items-center ">
        <div className="w-[90%] md:w-[40%] ">
          <SearchBar text={"search jobs"} setSearchInput={setSearchInput} />
        </div>

        {!loading ? (
          <div className=" w-full sm:w-[50%] max-h-full  mt-3 sm:mt-10 rounded-lg overflow-auto">
            {jobsList
              .filter((item) =>
                item.jobTitle
                  .toLowerCase()
                  .includes(searchInput.toLocaleLowerCase())
              )
              .map((data, index) => {
                return (
                  <JobPostCard
                    key={index}
                    jobTitle={data.jobTitle}
                    jobDescription={data.jobDescription}
                    location={data.location}
                    _id={data._id}
                  />
                );
              })}
          </div>
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </div>
  );
}

export default JobsLists;
