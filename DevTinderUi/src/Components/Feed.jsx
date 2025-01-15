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
      dispatch(addFeed(res.data));
    } catch (err) {
      return "Something Went Wrong";
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    feeds && (
      <div>
        <UserCard user={feeds[1]} />
      </div>
    )
  );
};

export default Feed;
