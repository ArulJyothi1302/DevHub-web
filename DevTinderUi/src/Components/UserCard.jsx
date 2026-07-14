import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(removeFeed(userId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { _id, fName, lName, age, gender, photoUrl, skills, about } = user;

  return (
    <div className="flex justify-center px-4">
      <div
        className="
        card
        bg-info-content
        w-full
        max-w-md
        shadow-2xl
        rounded-2xl
        overflow-hidden
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-primary/30
      "
      >
        <figure>
          <img
            src={photoUrl}
            alt={fName}
            className="w-full h-72 object-cover"
          />
        </figure>

        <div className="card-body">

          <h2 className="card-title text-2xl text-white">
            {fName} {lName}
          </h2>

          {about && (
            <p className="text-gray-300">
              <span className="font-bold text-white">About:</span> {about}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-gray-300">

            {age && (
              <p>
                <span className="font-bold text-white">Age:</span> {age}
              </p>
            )}

            {gender && (
              <p>
                <span className="font-bold text-white">Gender:</span> {gender}
              </p>
            )}

          </div>

          {skills?.length > 0 && (
            <div className="mt-2">

              <h3 className="font-bold text-white mb-2">
                Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="badge badge-primary badge-outline p-3"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          )}

          <div className="card-actions mt-6 flex-col sm:flex-row">

            <button
              className="btn btn-warning w-full sm:flex-1"
              onClick={() => handleRequest("ignored", _id)}
            >
              ❌ Ignore
            </button>

            <button
              className="btn btn-primary w-full sm:flex-1"
              onClick={() => handleRequest("interested", _id)}
            >
              ✅ Interested
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserCard;