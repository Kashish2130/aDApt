import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const GroupChat = ({ open, onClose, room }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!open || !room) return;
    // Fetch message history first
    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/groupchat/${room}/messages`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        const mapped = Array.isArray(data)
          ? data.map((msg) => ({
              id: msg._id,
              userId: msg.sender?._id,
              fullname: msg.sender?.fullname,
              text: msg.message,
              timestamp: msg.timestamp,
            }))
          : [];
        setMessages(mapped);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchHistory();

    // Connect to socket.io server
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    // Join the room
    newSocket.emit("joinRoom", room);
    // Listen for incoming messages
    newSocket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    // Cleanup on close/unmount
    return () => {
      newSocket.disconnect();
      setSocket(null);
      setMessages([]);
    };
  }, [open, room]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;
    socket.emit("sendMessage", {
      roomId: room,
      message: input,
      user,
    });
    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 9999,
        background: "#F5F0CD",
        border: "2px solid #00897B",
        borderRadius: 18,
        width: 370,
        height: 420,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 24px rgba(129,191,218,0.15)",
        fontFamily: "'Grandstander Variable', 'Krona One', sans-serif",
      }}
    >
      <div
        style={{
          padding: 12,
          borderBottom: "2px solid #00897B",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#00897B",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 18, color: "#1A202C" }}>
          Group Chat
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: "#080807ff",
            fontWeight: 700,
          }}
          title="Close"
        >
          ×
        </button>
      </div>

      <div
        style={{ flex: 1, overflowY: "auto", padding: 14, background: "#fff" }}
      >
        {messages.map((msg) => {
          const msgUserId = String(msg.userId);
          const currentUserId = user && user._id ? String(user._id) : "";
          const isOwn = msgUserId === currentUserId;

          // Color palette for users
          const userColors = [
            "#00897B", "#efc852ff", "#3bb9efff", "#ffA500", "#55f2b8ff"
          ];
          // Hash function to assign color based on userId
          function getUserColor(id) {
            let hash = 0;
            for (let i = 0; i < id.length; i++) {
              hash = id.charCodeAt(i) + ((hash << 5) - hash);
            }
            return userColors[Math.abs(hash) % userColors.length];
          }
          const nameColor = isOwn ? "#000000" : getUserColor(msgUserId);

          return (
            <div
              key={msg.id}
              style={{
                marginBottom: 10,
                display: "flex",
                justifyContent: isOwn ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  background: "#f4f0ec",
                  color: "#1A202C",
                  borderRadius: 12,
                  padding: "8px 16px",
                  maxWidth: "70%",
                  textAlign: isOwn ? "right" : "left",
                  fontSize: 15,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: nameColor,
                  }}
                >
                  {isOwn ? "You" : msg.fullname || "User"}
                </span>
                <br />
                <span>{msg.text}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        style={{
          display: "flex",
          borderTop: "2px solid #81BFDA",
          padding: 12,
          background: "#F5F0CD",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            marginRight: 10,
            padding: "8px 10px",
            borderRadius: 8,
            border: "2px solid #00897B",
            background: "#fff",
            fontSize: 15,
            fontFamily: "inherit",
            outline: "none",
          }}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          style={{
            padding: "8px 18px",
            borderRadius: 8,
            background: "#00897B",
            color: "#fff",
            border: "none",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 2px 8px #81BFDA55",
            transition: "background 0.2s",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
