import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);
  const targetUser = connections?.find(
    (connection) => connection?._id === targetUserId,
  );
  const userId = user?._id;
  const firstName = user?.fName;
  const lastName = user?.lName;
  useEffect(() => {
    if (!userId) {
      return;
    }

    // as soon as the comp mounts, join the chat room with the target user, -> connection is made with the backedn socket joinChat event
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });
    socket.on("receiveMessage", ({ firstName, lastName, userId, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, userId, text },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    try {
      fetchChatMessage();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchChatMessage = async () => {
    const chats = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    const chatMessage = chats?.data?.message.map((msg) => {
      const { text, senderId } = msg;
      return {
        userId: senderId?._id,
        firstName: senderId?.fName,
        lastName: senderId?.lName,
        text,
      };
    });
    setMessages(chatMessage);
  };
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };
  return (
    <div className="w-3/4 p-5 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className=" p-5 border-b border-gray-600 text-center text-2xl font-bold">
        Chat
      </h1>
      <div className=" flex-1 overflow-y-scroll">
        {/* DISPLAY MESSAGE */}
        {messages.map((message, index) => {
          const isMyMessage = userId === message.userId;
          return (
            <div key={index}>
              <div
                className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={isMyMessage ? user?.photoUrl : targetUser?.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {isMyMessage
                    ? "You"
                    : message.firstName + " " + message?.lastName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message"
          className="flex-1 items-center border-t border-gray-500 bg-black text-white p-2 rounded-l-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="btn btn-primary text-black px-6 py-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
