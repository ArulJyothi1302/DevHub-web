import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        baseUrl + "request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Api Hitted");
      if (res.status === 200) {
        dispatch(removeFeed(userId));
      }
    } catch (err) {}
  };
  const { _id, fName, lName, age, gender, photoUrl, skills, about } = user;
  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-info-content w-96 shadow-xl my-2">
        <figure>
          <img src={photoUrl} alt="user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{fName + " " + lName}</h2>
          {about && (
            <p>
              <strong>About me:{about} </strong>
              {about}
            </p>
          )}
          {age && (
            <p>
              <strong>age: </strong>
              {age}
            </p>
          )}
          {gender && (
            <p>
              <strong>gender: </strong> {gender}
            </p>
          )}

          {skills && <p>{skills.map((skills) => "Skills:" + skills + ", ")}</p>}
          <div className="card-actions justify-start py-4">
            <button
              className="btn btn-warning"
              onClick={() => handleRequest("ignored", _id)}
            >
              Ignore ❌
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleRequest("interested", _id)}
            >
              Interested ✅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
