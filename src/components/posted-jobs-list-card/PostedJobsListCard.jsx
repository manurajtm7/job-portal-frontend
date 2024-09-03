import { TimerIcon, Trash2 } from "lucide-react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

function PostedJobsListCard({ _id, jobTitle, expectedDate, setChanges }) {
  const handleDeleteJobPost = async () => {
    const confirmation = confirm("do you want to delete job post ?");

    if (!confirmation) return;

    const response = await fetch("http://localhost:4000/jobs/posts", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      alert("successfully deleted");
      toast.success("successfully deleted job post");
      setChanges((prev) => !prev);
    } else {
      toast.error("Error while  deleting a  job post / try to log again");
    }
  };
  return (
    <div className="w-full h-32 border rounded-md p-6 ">
      <ToastContainer />
      <div className="w-full flex items-center justify-between">
        <h1 className="font-medium">{jobTitle}</h1>
        <Trash2
          className="hover:text-red-600 transition-all cursor-pointer"
          onClick={handleDeleteJobPost}
        />
      </div>
      <p className=" mt-4 flex gap-2 items-center justify-start">
        <TimerIcon /> {expectedDate}
      </p>
    </div>
  );
}

export default PostedJobsListCard;
