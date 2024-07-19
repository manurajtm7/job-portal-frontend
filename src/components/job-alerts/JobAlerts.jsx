import React, { useContext, useEffect, useState } from "react";
import JobAlertCard from "../job-alerts-card/JobAlertCard";
import { globalContext } from "../../contexts/application-list-context/ApplicationListContext";
import LoadingAnimation from "../loading-status/loading-animation/LoadingAnimation";

function JobAlerts() {
  const { applications, fetchJobAlerts, error, loading } =
    useContext(globalContext);

  useEffect(() => {
    fetchJobAlerts();
  }, []);

  return (
    <div className="w-full h-[90%]   grid place-items-center overflow-auto">
      <div className=" w-[90%] h-4/5   flex gap-5 flex-col ">
        {!loading ? (
          applications?.map((data, index) => (
            <JobAlertCard key={index} {...data} />
          ))
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </div>
  );
}

export default JobAlerts;
