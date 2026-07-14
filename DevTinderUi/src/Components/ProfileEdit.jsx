import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
  const [fName, setFname] = useState(user.fName || "");
  const [lName, setLname] = useState(user.lName || "");
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [err, setErr] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const saveUser = async () => {
    try {
      setErr("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          fName,
          lName,
          about,
          age,
          gender,
          photoUrl,
          skills,
        },

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setErr(err?.response?.data);
    }
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row items-start justify-center gap-8">
        {" "}
        <div className="card bg-info-content w-full max-w-xl shadow-2xl rounded-2xl">
          {" "}
          <div className="card-body">
            <h2 className="card-title mx-auto">Edit Profile</h2>

            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={fName}
                  onChange={(e) => setFname(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="label"></div>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lName}
                  onChange={(e) => setLname(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="label"></div>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="label"></div>
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="label"></div>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Photo Url</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="label"></div>
              </label>
              <div className="mt-4">
                <label className="font-semibold block mb-3">Gender</label>

                <div className="flex flex-wrap gap-6">
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="radio radio-primary"
                    />
                    Male
                  </label>

                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="radio radio-primary"
                    />
                    Female
                  </label>

                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="others"
                      checked={gender === "others"}
                      onChange={(e) => setGender(e.target.value)}
                      className="radio radio-primary"
                    />
                    Others
                  </label>
                </div>
              </div>
            </div>
            <div className="card-actions mt-6">
              <button
                onClick={saveUser}
                className="btn btn-primary w-full rounded-xl"
              >
                Save Profile
              </button>
            </div>
            <p className="text-red">{err}</p>
          </div>
        </div>
        <div className="w-full max-w-md">
          {" "}
          <UserCard user={{ fName, lName, age, gender, photoUrl, about }} />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Successfully Updated.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
