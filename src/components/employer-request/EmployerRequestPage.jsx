import React, { useEffect, useState } from "react";
import RequestCard from "../request-card/RequestCard";
import { ToastContainer } from "react-toastify";
import LoadingAnimation from "../loading-status/loading-animation/LoadingAnimation";

function EmployerRequestPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchHandle = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/chat-request", {
          method: "GET",
          credentials: "include",
        });
        const allDetails = await response.json();
        setRequests(allDetails.body);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 6000);
      }
    };
    fetchHandle();
  }, [change]);

  return (
    <div className="w-full h-4/5 flex gap-5 flex-col p-5 overflow-auto">
      {requests.length < 1 ? (
        <div className="w-full h-full grid place-items-center">
          <span className="text-zinc-700 text-center">
            No request available...
          </span>
        </div>
      ) : !loading ? (
        requests.map((data, index) => {
          return <RequestCard key={index} data={data} setChange={setChange} />;
        })
      ) : (
        <LoadingAnimation />
      )}
      <ToastContainer />
    </div>
  );
}

export default EmployerRequestPage;
