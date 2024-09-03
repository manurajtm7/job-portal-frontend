import React, { useContext, useEffect, useState } from "react";
import JobAlertCard from "../job-alerts-card/JobAlertCard";
import { globalContext } from "../../contexts/application-list-context/ApplicationListContext";
import LoadingAnimation from "../loading-status/loading-animation/LoadingAnimation";

function JobAlerts() {
  const { applications, fetchJobAlerts, loading } = useContext(globalContext);

  useEffect(() => {
    fetchJobAlerts();
  }, []);

  return (
    <div className="w-full h-full   grid place-items-center overflow-auto ">
      <div className=" w-[90%] h-4/5 mt-8 flex gap-5 flex-col overflow-auto snap-y">
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
