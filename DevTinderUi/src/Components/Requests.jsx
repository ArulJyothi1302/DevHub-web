import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  const getRequests = async () => {
    try {
      const res = await axios.get(baseUrl + "user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {}
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        baseUrl + "request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(_id));
    } catch (err) {}
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (!request) return;
  if (request.length === 0)
    return (
      <h1 className="text-white font-bold text-3xl text-center my-5">
        No Request Found
      </h1>
    );
  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-white text-3xl font-bold my-5">
        Connection Requests
      </h1>
      {request.map((req) => {
        const { _id, fName, lName, about, gender, photoUrl } = req.fromUserId;
        return (
          <div
            className="flex m-4 p-4 justify-between items-center rounded-lg border border-b-gray-100  bg-base-300 w-1/3"
            key={_id}
          >
            <div>
              <img
                className="mx-2 p-2 w-20 h-20 rounded-full"
                src={photoUrl}
                alt="user"
              />
            </div>
            <div>
              <h1 className="text-white font-bold">{fName + " " + lName}</h1>
              <p className="text-white font-bold">{gender}</p>
              <p className="text-white">{about}</p>
            </div>
            <div className="flex flex-col md:flex-row">
              <button
                className="btn btn-primary mx-2 my-2"
                onClick={() => reviewRequest("accepted", req._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error mx-2 my-2"
                onClick={() => reviewRequest("rejected", req._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
