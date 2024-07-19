import React, { useContext, useEffect, useState } from "react";
import JobApplicationCard from "../../components/job-application-card/JobApplicationCard";
import { useLocation } from "react-router-dom";
import { globalContext } from "../../contexts/application-list-context/ApplicationListContext";
import LoadingAnimation from "../../components/loading-status/loading-animation/LoadingAnimation";
import Navbar from "../../components/nav-bar/Navbar";

function JobAlertAlllInfo() {
  const location = useLocation();
  const [filterData, setFilterData] = useState(null);
  const { applications, fetchJobAlerts, loading } = useContext(globalContext);
  const [change, setChange] = useState(false);

  useEffect(() => {
    fetchJobAlerts();
  }, [change]);

  useEffect(() => {
    const jobAlertsId = location.pathname.split(":")[1];
    const filterData = applications.filter((item) => item._id === jobAlertsId);

    setFilterData(filterData[0]);
  }, [applications]);

  return (
    <div className="w-full h-screen bg-zinc-100 grid place-items-center">
      <Navbar />
      {!loading ? (
        <JobApplicationCard data={filterData} setChange={setChange} />
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}

export default JobAlertAlllInfo;
