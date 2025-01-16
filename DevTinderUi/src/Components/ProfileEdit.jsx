import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../utils/constants";
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
        baseUrl + "profile/edit",
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
        }
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
      <div className="flex justify-center my-2 mx-5">
        <div className="card bg-info-content my-2 w-96 mx-10 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mx-auto">Edit Profile</h2>

            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={fName}
                  onChange={(e) => setFname(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label"></div>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lName}
                  onChange={(e) => setLname(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label"></div>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label"></div>
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label"></div>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Photo Url</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label"></div>
              </label>
              <label>
                <div className="py-2">
                  <span className="label-text">Gender</span>
                </div>
                <span className="mx-1">male</span>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="mx-1">female</span>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="mx-1">others</span>

                <input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={gender === "others"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </div>
            <div className="card-actions justify-end">
              <button onClick={saveUser} className="btn btn-primary mx-auto">
                Save
              </button>
            </div>
            <p className="text-red">{err}</p>
          </div>
        </div>
        <div className="">
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
