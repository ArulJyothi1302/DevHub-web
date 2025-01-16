import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feeds) return;

    try {
      const res = await axios.get(baseUrl + "feed", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      return "Something Went Wrong";
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feeds) return;
  if (feeds.length <= 0) {
    return (
      <h1 className="text-white text-center my-5 text-3xl">No Users Found</h1>
    );
  }
  return (
    feeds && (
      <div>
        <UserCard user={feeds[0]} />
      </div>
    )
  );
};

export default Feed;
