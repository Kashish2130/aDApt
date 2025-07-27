
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Change if needed

const GroupChat = ({ open, onClose, room = "global" }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!open) return;
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("chat history", (history) => {
      setMessages(history);
    });
    socketRef.current.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [open]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socketRef.current.emit("chat message", {
      text: input,
      userId: user?._id,
      fullname: user?.fullname,
    });
    setInput("");
  };

  if (!open) return null;
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
        <span style={{ fontWeight: 700, fontSize: 18, color: "#1A202C" }}>Group Chat</span>
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
      <div style={{ flex: 1, overflowY: "auto", padding: 14, background: "#fff" }}>
        {messages.map((msg) => {
          const msgUserId = String(msg.userId);
          const currentUserId = String(user?._id);
          const isOwn = msgUserId === currentUserId;
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
                //   boxShadow: isOwn
                //     ? "0 2px 8px #81BFDA55"
                //     : "0 2px 8px #FADA7A55",
                //   border: isOwn ? "2px solid #81BFDA" : "2px solid #FADA7A",
                  fontSize: 15,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 13, color: isOwn ? "#00897B" : "#FADA7A" }}>
                  {isOwn
                    ? "You"
                    : msg.fullname && msg.fullname !== user?.fullname
                    ? msg.fullname
                    : msg.fullname || "User"}
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
