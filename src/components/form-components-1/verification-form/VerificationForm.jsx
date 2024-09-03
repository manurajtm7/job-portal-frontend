import { ChevronLeft, Image, Paperclip, Send } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DescriptionCard from "../../description-card/DescriptionCard";
import { globalContext } from "../../../contexts/employer-details-context/EmployerDetailsContext";
import MiniLoader from "../../loading-status/mini-loader/MiniLoader";

function VerificationForm() {
  const navigate = useNavigate();
  const { profileDetails, fetchHandle } = useContext(globalContext);
  const [proof, setProof] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHandle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("_id", profileDetails._id);

    const response = await fetch("http://localhost:5000/requests/post", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setLoading(false);
      alert("successfully added employee verification details");
      navigate("/");
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
      alert("something wrong with submission / try to log in first ");
    }
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div
        onClick={() => navigate(-1)}
        className="w-4/5  flex gap-2 items-center cursor-pointer"
      >
        <ChevronLeft size={30} />
        <span className="text-lg font-semibold">back</span>
      </div>
      <div className="w-4/5 h-4/5  py-6 flex flex-col sm:flex-row items-center justify-center">
        <DescriptionCard />
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-1/3 h-1/2  flex flex-col gap-5 items-center justify-center shadow rounded-lg"
        >
          <div>
            <label htmlFor="file" className="text-lg font-medium">
              Please select the document image
            </label>
            <p className="text-center opacity-70">click icon to add</p>
          </div>
          <div className="w-1/2 sm:w-1/2 h-10  border border-zinc-900 rounded-md grid place-items-center relative animate-pulse">
            <Image />
            <input
              type="file"
              name="file"
              placeholder="please select a document image"
              className="w-full h-full  opacity-0 absolute"
              accept="*.png/jpg/jpej"
              onChange={(e) => setProof(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="w-1/2 h-12 text-white text-xs sm:text-base font-semibold bg-blue-600 flex gap-5 items-center justify-center rounded-lg"
          >
            {loading ? (
              <MiniLoader />
            ) : (
              <div className="flex gap-3 items-center justify-center">
                {"Send verification"}
                <Send size={17} />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerificationForm;
