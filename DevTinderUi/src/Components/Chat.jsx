import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);
  const targetUser = connections?.find(
    (connection) => connection?._id === targetUserId,
  );
  const userId = user?._id;
  const firstName = user?.fName;
  const lastName = user?.lName;
  const socketRef = useRef(null);
  const typingTimeout = useRef(null);
  useEffect(() => {
    if (!userId) {
      return;
    }

    // as soon as the comp mounts, join the chat room with the target user, -> connection is made with the backedn socket joinChat event
    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { firstName, userId, targetUserId });
    socketRef.current.emit("markMessagesDelivered", {
      userId,
      targetUserId,
    });

    socketRef.current.emit("checkOnlineStatus", {
      targetUserId,
    });

    socketRef.current.on("messagesDelivered", ({ messageIds }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          messageIds.includes(msg.messageId)
            ? { ...msg, status: "delivered" }
            : msg,
        ),
      );

      messageIds.forEach((messageId) => {
        socketRef.current.emit("messageSeen", {
          messageId,
          userId,
          targetUserId,
        });
      });
    });

    // NEW: bulk "messages seen" listener — fired when the other user
    // opens the chat and all previously sent/delivered messages flip to seen
    socketRef.current.on("messagesSeen", ({ messageIds }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          messageIds.includes(msg.messageId) ? { ...msg, status: "seen" } : msg,
        ),
      );
    });

    socketRef.current.on("messageSeen", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId ? { ...msg, status: "seen" } : msg,
        ),
      );
    });
    socketRef.current.on("onlineStatus", ({ isOnline }) => {
      setIsOnline(isOnline);
    });

    socketRef.current.on("userStatusChanged", ({ userId, isOnline }) => {
      if (userId === targetUserId) {
        setIsOnline(isOnline);
      }
    });
    socketRef.current.on(
      "receiveMessage",
      ({
        messageId,
        firstName,
        lastName,
        userId: senderId,
        text,
        createdAt,
        status,
      }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            messageId,
            firstName,
            lastName,
            userId: senderId,
            text,
            createdAt,
            status,
          },
        ]);
        if (senderId === targetUserId) {
          console.log("Sending Seen:", messageId);
          socketRef.current.emit("markMessagesDelivered", {
            userId,
            targetUserId,
          });

          socketRef.current.emit("messageSeen", {
            messageId,
            userId,
            targetUserId,
          });
        }
      },
    );

    socketRef.current.on("typing", ({ firstName }) => {
      setIsTyping(true);
    });

    socketRef.current.on("stopTyping", () => {
      setIsTyping(false);
    });
    return () => {
      socketRef.current.off("receiveMessage");
      socketRef.current.off("onlineStatus");
      socketRef.current.off("userStatusChanged");
      socketRef.current.off("messagesDelivered");
      socketRef.current.off("messagesSeen");
      socketRef.current.off("messageSeen");
      socketRef.current.off("typing");
      socketRef.current.off("stopTyping");
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    fetchChatMessage();
  }, [targetUserId]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const fetchChatMessage = async () => {
    const chats = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    const chatMessage = chats?.data?.message.map((msg) => {
      const { text, senderId, createdAt } = msg;
      return {
        messageId: msg._id,
        userId: senderId?._id,
        firstName: senderId?.fName,
        lastName: senderId?.lName,
        text,
        createdAt,
        status: msg.status,
      };
    });
    setMessages(chatMessage);

    // Entering the chat = the user is viewing everything right now,
    // so mark every message from targetUser as "seen".
    if (socketRef.current && userId && targetUserId) {
      socketRef.current.emit("markMessagesSeen", { userId, targetUserId });
    }
  };
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socketRef.current.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
    socketRef.current.emit("stopTyping", {
      userId,
      targetUserId,
    });
  };
  return (
    <div className="w-full max-w-5xl mx-auto h-[calc(100vh-90px)] bg-base-200 rounded-none sm:rounded-2xl shadow-xl flex flex-col overflow-hidden">
      {" "}
      <div className="flex items-center gap-4 p-4 border-b border-base-300 bg-base-300">
        <img
          src={targetUser?.photoUrl}
          alt={targetUser?.fName}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h2 className="font-bold text-lg">
            {targetUser?.fName} {targetUser?.lName}
          </h2>

          <p
            className={`text-sm font-medium ${
              isOnline ? "text-green-500" : "text-gray-400"
            }`}
          >
            {isOnline ? "🟢 Online" : "⚪ Offline"}
            {isTyping && (
              <div className=" text-sm text-primary italic animate-pulse">
                {targetUser?.fName} is typing...
              </div>
            )}
          </p>
        </div>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-base-100"
      >
        {" "}
        {/* DISPLAY MESSAGE */}
        {messages.map((message, index) => {
          const isMyMessage = userId === message.userId;
          return (
            <div key={message.messageId}>
              <div
                className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-12 rounded-full">
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
                  <time className="text-xs opacity-50">
                    {message.createdAt &&
                      new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </time>
                </div>
                <div className="chat-bubble max-w-[80%] break-words">
                  {message.text}
                </div>{" "}
                {isMyMessage && (
                  <div className="chat-footer opacity-50">
                    {message.status === "sent" && "✓ Sent"}

                    {message.status === "delivered" && "✓✓ Delivered"}

                    {message.status === "seen" && (
                      <span className="text-blue-500">✓✓ Seen</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-base-300 p-3 bg-base-200">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered flex-1 rounded-full"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);

              socketRef.current.emit("typing", {
                firstName,
                userId,
                targetUserId,
              });

              clearTimeout(typingTimeout.current);

              typingTimeout.current = setTimeout(() => {
                socketRef.current.emit("stopTyping", {
                  userId,
                  targetUserId,
                });
              }, 1000);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="btn btn-primary text-black px-6 py-2 rounded-r-lg"
          >
            Send ➜
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
