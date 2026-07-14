import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router";

const Connections = () => {
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      //   if (connections) return;
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {}
  };
  useEffect(() => {
    getConnections();
  }, []);
  const connections = useSelector((store) => store.connections);
  if (!connections) return;
  if (connections.length === 0) {
    return (
      <h1 className="text-center text-3xl my-5">
        There is no connections, Make Connections with Devs!!!
      </h1>
    );
  }
  return (
    connections && (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-center text-white font-bold my-5 text-3xl">
          Connections
        </h1>
        {connections.map((con) => {
          const { fName, lName, about, photoUrl, age } = con;

          return (
            <div
              key={con._id}
              className="w-full max-w-2xl bg-base-200 rounded-2xl shadow-xl border border-base-300 p-5 mb-5
  transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <img
                  src={photoUrl}
                  alt={fName}
                  className="w-24 h-24 rounded-full object-cover ring ring-primary ring-offset-2"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white">
                    {fName} {lName}
                  </h2>

                  <p className="text-gray-400">{age && `${age} years`}</p>

                  {about && (
                    <p className="text-gray-300 mt-2 line-clamp-3">{about}</p>
                  )}
                </div>

                <Link to={`/chat/${con._id}`}>
                  <button className="btn btn-primary rounded-full px-8">
                    💬 Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
