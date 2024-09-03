import React, { useContext, useEffect, useState } from "react";
import JobApplicationCard from "../../components/job-application-card/JobApplicationCard";
import { useLocation, useNavigate } from "react-router-dom";
import { globalContext } from "../../contexts/application-list-context/ApplicationListContext";
import LoadingAnimation from "../../components/loading-status/loading-animation/LoadingAnimation";
import Navbar from "../../components/nav-bar/Navbar";
import { ChevronLeft } from "lucide-react";

function JobAlertAlllInfo() {
  const location = useLocation();
  const [filterData, setFilterData] = useState(null);
  const { applications, fetchJobAlerts, loading } = useContext(globalContext);
  const [change, setChange] = useState(false);
  const naviagte = useNavigate();

  useEffect(() => {
    fetchJobAlerts();
  }, [change]);

  useEffect(() => {
    const jobAlertsId = location.pathname.split(":")[1];
    const filterData = applications.filter((item) => item._id === jobAlertsId);

    setFilterData(filterData[0]);
  }, [applications]);

  return (
    <div className="w-full h-max   grid place-items-center relative">
      <div className="w-full h-24">
        <Navbar />
      </div>
      <div
        onClick={() => naviagte(-1)}
        className="w-4/5  mt-5  px-4 sm:flex absolute hidden  xs:top-10 md:top-24 z-30 cursor-pointer "
      >
        <ChevronLeft /> back
      </div>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <JobApplicationCard data={filterData} setChange={setChange} />
      )}
    </div>
  );
}

export default JobAlertAlllInfo;
