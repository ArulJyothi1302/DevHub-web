import React from "react";
import ProfileEdit from "./ProfileEdit";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  // console.log("data:" + user.fName);
  return (
    user && (
      <div className="min-h-screen bg-base-100 py-8">
        <ProfileEdit user={user} />
      </div>
    )
  );
};

export default Profile;
