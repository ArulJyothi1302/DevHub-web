import React from "react";

const UserCard = ({ user }) => {
  const { fName, lName, age, gender, photoUrl, skills, about } = user;
  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-info-content w-96 shadow-xl my-2">
        <figure>
          <img src={photoUrl} alt="user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{fName + " " + lName}</h2>
          {about && (
            <p>
              <strong>About me: </strong>
              {about}
            </p>
          )}
          {age && (
            <p>
              <strong>age: </strong>
              {age}
            </p>
          )}
          {gender && (
            <p>
              <strong>gender: </strong> {gender}
            </p>
          )}

          {skills && <p>{skills.map((skills) => skills + ", ")}</p>}
          <div className="card-actions justify-start py-4">
            <button className="btn btn-warning">Ignore ❌</button>
            <button className="btn btn-primary">Interested ✅</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
