import React from "react";
import ProfileEdit from "./ProfileEdit";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  // console.log("data:" + user.fName);
  return (
    user && (
      <div>
        <ProfileEdit user={user} />
        profile
      </div>
    )
  );
};

export default Profile;
