import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeRequests(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!request) return null;

  if (request.length === 0) {
    return (
      <h1 className="text-white font-bold text-3xl text-center my-10">
        No Request Found
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-white text-3xl font-bold text-center mb-8">
        Connection Requests
      </h1>

      {request.map((req) => {
        const { _id, fName, lName, about, gender, photoUrl } = req.fromUserId;

        return (
          <div
            key={_id}
            className="bg-base-300 rounded-2xl shadow-lg border border-base-content/20
            p-5 mb-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
          >
            <div className="flex flex-col md:flex-row items-center gap-5">
              {/* Profile */}
              <img
                className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                src={photoUrl}
                alt={fName}
              />

              {/* User Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {fName} {lName}
                </h2>

                <p className="text-gray-300 mt-1 capitalize">
                  {gender}
                </p>

                {about && (
                  <p className="text-gray-400 mt-2">
                    {about}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  className="btn btn-success flex-1"
                  onClick={() => reviewRequest("accepted", req._id)}
                >
                  ✓ Accept
                </button>

                <button
                  className="btn btn-error flex-1"
                  onClick={() => reviewRequest("rejected", req._id)}
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;