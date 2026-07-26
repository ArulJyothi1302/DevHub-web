import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const SWIPE_DISTANCE = 1000;
const SWIPE_THRESHOLD = 150;

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, fName, lName, age, gender, photoUrl, skills, about } = user;
  const visibleSkills = Array.isArray(skills)
    ? skills.filter(Boolean).slice(0, 5)
    : [];

  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);

  const rotate = useTransform(x, [-220, 220], [-12, 12]);
  const swipeBackground = useTransform(
    x,
    [-220, 0, 220],
    ["rgba(239,68,68,0.28)", "rgba(15,23,42,0)", "rgba(34,197,94,0.28)"],
  );

  const likeOpacity = useTransform(x, [30, 150], [0, 1]);
  const ignoreOpacity = useTransform(x, [-150, -30], [1, 0]);

  const likeScale = useTransform(x, [30, 150], [0.9, 1.08]);
  const ignoreScale = useTransform(x, [-150, -30], [1.08, 0.9]);

  useEffect(() => {
    setExitX(0);
    x.set(0);
  }, [_id, x]);

  const handleRequest = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        dispatch(removeFeed(_id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      style={{ backgroundColor: swipeBackground }}
      className="flex w-full justify-center rounded-[28px] px-3 py-4 sm:px-5 sm:py-6"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.22}
        whileDrag={{ scale: 1.015 }}
        whileTap={{ cursor: "grabbing" }}
        style={{ x, rotate }}
        animate={{
          x: exitX,
          rotate: exitX > 0 ? 18 : exitX < 0 ? -18 : 0,
          opacity: exitX === 0 ? 1 : 0,
        }}
        transition={{ duration: 0.35 }}
        onDragEnd={(e, info) => {
          if (info.offset.x > SWIPE_THRESHOLD) {
            setExitX(SWIPE_DISTANCE);
          } else if (info.offset.x < -SWIPE_THRESHOLD) {
            setExitX(-SWIPE_DISTANCE);
          }
        }}
        onAnimationComplete={() => {
          if (exitX > 0) {
            handleRequest("interested");
          }

          if (exitX < 0) {
            handleRequest("ignored");
          }
        }}
        className="relative w-full max-w-[21rem] cursor-grab touch-pan-y sm:max-w-[23rem]"
      >
        <motion.div
          style={{
            opacity: likeOpacity,
            scale: likeScale,
          }}
          className="absolute right-4 top-5 z-30 rotate-12 rounded-lg border-2 border-green-400 bg-black/35 px-3 py-1.5 text-lg font-black tracking-wide text-green-300 backdrop-blur-md sm:right-5 sm:text-xl"
        >
          LIKE
        </motion.div>

        <motion.div
          style={{
            opacity: ignoreOpacity,
            scale: ignoreScale,
          }}
          className="absolute left-4 top-5 z-30 -rotate-12 rounded-lg border-2 border-red-400 bg-black/35 px-3 py-1.5 text-lg font-black tracking-wide text-red-300 backdrop-blur-md sm:left-5 sm:text-xl"
        >
          PASS
        </motion.div>

        <div className="overflow-hidden rounded-2xl bg-base-200 shadow-[0_16px_44px_rgba(0,0,0,0.28)] ring-1 ring-white/10">
          <div className="relative">
            <img
              src={photoUrl}
              alt={fName}
              className="h-[clamp(300px,52svh,400px)] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-5 sm:left-5 sm:right-5">
              <h2 className="break-words text-3xl font-bold leading-tight sm:text-4xl">
                {fName} {lName}
              </h2>

              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-base text-white/90 sm:text-lg">
                {age && <span>{age}</span>}

                {gender && (
                  <>
                    <span aria-hidden="true">|</span>
                    <span>{gender}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            {about && (
              <div>
                <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-base-content/70">
                  About
                </h3>

                <p className="max-h-20 overflow-hidden text-sm leading-6 text-base-content/70 sm:text-base">
                  {about}
                </p>
              </div>
            )}

            {visibleSkills.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-base-content/70">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {visibleSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-content sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRequest("ignored")}
                className="btn btn-outline btn-error min-h-11 rounded-full text-sm"
              >
                Pass
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRequest("interested")}
                className="btn btn-primary min-h-11 rounded-full text-sm"
              >
                Interested
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserCard;
