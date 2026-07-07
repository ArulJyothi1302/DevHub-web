import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isBuy, setIsBuy] = useState(false);
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [memberShipType, setMemberShipType] = useState("");

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true });
      if (res.data.isPremium) {
        setIsUserPremium(true);
        setMemberShipType(res.data.memberShipType);
      } else {
        setIsUserPremium(false);
        setMemberShipType("");
      }
    }
    catch(err){
      console.error("Error verifying premium user:", err);
    }
  }
  const handleBuy = async (type) => {
    try {
      setIsBuy(true);
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          memberShipType: type,
        },
        { withCredentials: true },
      );

      const { amount, currency, orderId, notes, keyId } = order.data;
      console.log("KeyID:", keyId);
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: "Dev Agent",
        description: "Test Transaction",
        order_id: orderId, // This is the order_id created in the backend
        // callback_url: 'http://localhost:3000/payment-success', // Your success URL
        prefill: {
          name: notes?.firstname + " " + notes?.lastname,
          email: notes?.email,
          contact: notes?.contact || "999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      setIsBuy(false);
    } catch (error) {
      console.error("Error creating payment:", error);
      setIsBuy(false);
    }
  };
  return (
    isUserPremium ? (
      <div className="flex justify-center items-center h-screen">
        <div className="card p-10 bg-base-300 rounded-box grid h-60 grow place-items-center">
          <h1 className="font-bold text-2xl">You are a Premium User</h1>
          <div className="text-lg">Membership Type: {memberShipType}</div>
        </div>
      </div>
    ) : (
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
            <button
              onClick={() => handleBuy("basic")}
              className="btn btn-primary"
            >
              Buy Basic
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
            <h1 className="font-bold text-2xl">Super Plan</h1>
            <ul>
              <li>Infinite reqs</li>
              <li>1000 Chats Per Day</li>
              <li>Blue Tick (6months)</li>
            </ul>
            <button
              onClick={() => handleBuy("super")}
              className="btn btn-neutral"
            >
              Buy Super
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
            <h1 className="font-bold text-2xl">Premium Plan</h1>
            <ul className="">
              <li>Infinite reqs</li>
              <li>Infinite Chats</li>
              <li>Blue Tick (1 Year)</li>
            </ul>
            <button
              onClick={() => handleBuy("premium")}
              className="btn btn-warning"
            >
              Buy Premium
            </button>
          </div>
        </div>
      </div>
      {isBuy && (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
      )}
    </>
    )
  );
};

export default Premium;
