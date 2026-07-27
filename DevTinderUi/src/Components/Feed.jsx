import React, { useEffect, useRef, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { BASE_URL } from "../utils/constants";
import { addFeed, replaceFeed } from "../utils/feedSlice";
import { Loading } from "./Loading";

const PREFETCH_THRESHOLD = 3;
const PAGE_SIZE = 10;

const Feed = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const feeds = useSelector((store) => store.feed);

  const cursorRef = useRef(null);
  const isFetchingRef = useRef(false);

  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const getFeed = async (ignoreHasMore = false) => {
    if (!user || isFetchingRef.current || (!ignoreHasMore && !hasMore)) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setErr(null);

    try {
      let url = `/feed?limit=${PAGE_SIZE}`;
      console.log("url",url);
      if (cursorRef.current) {
        url += `&cursor=${cursorRef.current}`;
      }

      const res = await api.get(url, {
        withCredentials: true,
      });

      const { data, nextCursor, hasMore: more } = res.data;

      cursorRef.current = nextCursor;
      setHasMore(more);

      if (ignoreHasMore) {
        dispatch(replaceFeed(data)); // First load
      } else {
        dispatch(addFeed(data)); // Prefetch
      }
    } catch (err) {
      console.error(err);
      setErr("Unable to fetch users");
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  };

  // Reset feed whenever logged in user changes
  useEffect(() => {
    if (!user) return;

    cursorRef.current = null;
    isFetchingRef.current = false;

    setHasMore(true);
    setErr(null);

    void getFeed(true);
  }, [user]);

  // Prefetch when only few users remain
  useEffect(() => {
    if (!feeds || feeds.length > PREFETCH_THRESHOLD || !hasMore) {
      return;
    }

    void getFeed();
  }, [feeds, hasMore]);

  if (err) {
    return <h1 className="text-center text-red-500 text-2xl mt-10">{err}</h1>;
  }

  if (!feeds) {
    return (
      <div className="flex justify-center item items-center my-40">
        <Loading />
      </div>
    );
  }

  if (feeds.length === 0) {
    return (
      <h1 className="text-white text-center my-5 text-3xl">No Users Found</h1>
    );
  }

  return (
    <div>
      <UserCard user={feeds[0]} />
    </div>
  );
};

export default Feed;
