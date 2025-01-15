import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      //   if (connections) return;
      const res = await axios.get(baseUrl + "user/connections", {
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
      <div className="flex flex-col items-center">
        <h1 className="text-center text-white font-bold my-5 text-3xl">
          Connections
        </h1>
        {connections.map((con) => {
          const { fName, lName, photoUrl, age, about } = con;

          return (
            <div
              key={con._id}
              className="flex border border-white m-4 rounded-lg w-1/3 my-4 p-4 bg-warning-content"
            >
              <div>
                <img
                  src={photoUrl}
                  alt="user"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="mx-4 font-bold">
                <h1 className=" text-white">{fName + " " + lName}</h1>
                <p className="font-bold text-white">age:{age}</p>
                {about && <p>{about}</p>}
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
