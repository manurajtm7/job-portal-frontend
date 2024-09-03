import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../loading-status/loading-animation/LoadingAnimation";
import { Upload } from "lucide-react";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    dob: "",
    hobbies: "",
    interests: "",
    habits: "",
    qualification: "",
    profilePicture: null,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = e.target.files;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else if (name === "images") {
      setFormData({ ...formData, images: [...files] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataObject = new FormData();
    formDataObject.append("age", formData.age);
    formDataObject.append("dob", formData.dob);
    formDataObject.append("hobbies", formData.hobbies);
    formDataObject.append("interests", formData.interests);
    formDataObject.append("habits", formData.habits);
    formDataObject.append("qualification", formData.qualification);

    if (formData.profilePicture) {
      formDataObject.append("profilePicture", formData.profilePicture);
    }
    const {
      age,
      dob,
      hobbies,
      interests,
      habits,
      qualification,
      profilePicture,
    } = formData;

    if (
      {
        age,
        dob,
        hobbies,
        interests,
        habits,
        qualification,
        profilePicture,
      }
    ) {
      const response = await fetch(
        "http://localhost:4000/personal-profile-form",
        {
          method: "POST",
          body: formDataObject,
          credentials: "include",
        }
      );
      if (response.ok) {
        alert("personal details updated");
        setLoading(false);
        navigate("/");
      } else alert("something wrong with authentication");
    } else {
      alert("please add all the details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="bg-white p-8 rounded-lg  w-full h-full md:w-[70%] ">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create your profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 sm:space-y-0 sm:grid gap-5 grid-cols-2 mt-8 "
          >
            <div>
              <label className="block mb-2 text-sm text-gray-600 ml-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="w-full p-3 border rounded-lg outline-blue-200 focus:bg-blue-50 "
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 ml-2">
                Date of birth
              </label>
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                className="w-full p-3 border rounded-lg outline-blue-200 focus:bg-blue-50 "
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 ml-2">
                Hobbies
              </label>
              <input
                type="text"
                name="hobbies"
                placeholder="Hobbies"
                className="w-full p-3 border rounded-lg outline-blue-200 focus:bg-blue-50 "
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 ml-2">
                Interests
              </label>
              <input
                type="text"
                name="interests"
                placeholder="Interests"
                className="w-full p-3 border rounded-lg outline-blue-200 focus:bg-blue-50 "
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 ml-2">
                Habits
              </label>
              <input
                type="text"
                name="habits"
                placeholder="Any Habits"
                className="w-full p-3 border rounded-lg outline-blue-200 focus:bg-blue-50 "
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 ml-2">
                Qualifications
              </label>
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                className="w-full p-3 border rounded-lg outline-blue-200 focus:bg-blue-50  "
                onChange={handleChange}
              />
            </div>
            <div >
              <label className="block mb-2 text-sm text-gray-600 ml-2">
                Profile Picture
              </label>
              <div className="relative border">
                <input
                  type="file"
                  name="profilePicture"
                  className="w-full p-3 border rounded-lg outline-blue-200 focus:bg-blue-50  opacity-0 relative z-20"
                  onChange={handleFileChange}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-5 items-center justify-center cursor-pointer ">
                  <Upload size={35} />
                  <p>select an image</p>
                </div>
              </div>
            </div>
            <div className="hidden sm:block"></div>
            {/* <div>
              <label className="block mb-2 text-sm text-gray-600 ml-2">
                Multiple Images
              </label>
              <input
                type="file"
                name="images"
                multiple
                className="w-full p-3 border rounded-lg outline-blue-200 focus:bg-blue-50 "
                onChange={handleFileChange}
              />
            </div> */}
            <div className="w-full ">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
