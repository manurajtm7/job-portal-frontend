import React, { useContext, useEffect, useState } from "react";
import { globalContextAlerts } from "../../contexts/alerts-context/AlertContext";
import Navbar from "../../components/nav-bar/Navbar";
import NotificationCard from "../../components/card-notifications/NotificationCard";
import LoadingAnimation from "../../components/loading-status/loading-animation/LoadingAnimation";
import { globalContext } from "../../contexts/employer-details-context/EmployerDetailsContext";

function AlertScreen() {
  const { socket } = useContext(globalContextAlerts);
  const { profileDetails, fetchHandle } = useContext(globalContext);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHandle();
  }, []);

  useEffect(() => {
    const fetchJobsList = async () => {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/notifications/private-list",
        {
          method: "POST",
          body: JSON.stringify({ _id: profileDetails._id }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data?.body);
        setLoading(false);
      }
    };
    fetchJobsList();
  }, []);

  useEffect(() => {
    socket.on("users/live-update/message-receive", (res) => {
      setNotifications((prev) => [...prev, res]);
    });
  }, [socket]);

  return (
    <div className="w-full h-full grid place-items-center">
      <Navbar />
      <div className="w-full h-[85%]  mt-10 flex flex-col items-center overflow-auto ">
        <div className="w-[80%] sm:w-[63%] text-start mt-8 ">
          <h1 className="text-xl font-medium">Alerts and notifications</h1>
          <p className="text-sm opacity-45">
            your job alerts and notifications can view here
          </p>
        </div>

        <div className="w-[80%] sm:w-[63%] h-full overflow-auto mt-5 py-2 ">
          {loading ? (
            <LoadingAnimation />
          ) : (
            <div className="grid gap-5 items-center grid-cols-1 mt-2">
              {notifications
                .sort((a, b) => a.createdDate - b.createdDate)
                .map((data, index) => {
                  return <NotificationCard data={data} key={index} />;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlertScreen;
