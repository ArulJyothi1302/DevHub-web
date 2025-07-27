import React from "react";

const Premium = () => {
  return (
    <>
      <div className="mx-20 my-20 ">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card p-2 bg-base-300 rounded-box grid h-60 grow place-items-center">
            <h1 className="font-bold text-2xl">Basic Plan</h1>
            <ul>
              <li>100 reqs per month</li>
              <li>200 Chats Per Day</li>
              <li>Blue Tick (2months)</li>
            </ul>
            <button className="btn btn-primary">Buy Basic</button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
            <h1 className="font-bold text-2xl">Super Plan</h1>
            <ul>
              <li>Infinite reqs</li>
              <li>1000 Chats Per Day</li>
              <li>Blue Tick (6months)</li>
            </ul>
            <button className="btn btn-neutral">Buy Super</button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
            <h1 className="font-bold text-2xl">Premium Plan</h1>
            <ul className="">
              <li>Infinite reqs</li>
              <li>Infinite Chats</li>
              <li>Blue Tick (1 Year)</li>
            </ul>
            <button className="btn btn-warning">Buy Premium</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;
