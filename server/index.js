import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import emailRouter from "./routes/emailRoute.js";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import uploadRouter from './routes/uploadRoute.js';
import sharedLibraryRouter from "./routes/sharedResLibRoute.js";
import qnaRouter from "./routes/qnaRoute.js"; 
import lostAndFoundRouter from "./routes/lnfRoute.js";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";

import http from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

main().catch((err) => {
  console.error("DB Connection failed: ", err);
});
async function main() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("DB Connected !!");
  } catch (error) {
    console.error("Database connection error: ", error);
  }
}

// Socket.IO group chat logic
let chatMessages = [];
io.on("connection", (socket) => {
  console.log("User connected to chat:", socket.id);

  // Send existing messages to newly connected user
  socket.emit("chat history", chatMessages);

  // Listen for new messages
  socket.on("chat message", (msg) => {
    const message = { id: Date.now(), ...msg };
    chatMessages.push(message);
    io.emit("chat message", message); // Broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from chat:", socket.id);
  });
});


app.get("/", (req, res) => {
  res.send("Hey!This is my new Node JS project.");
});

//middlewares
const auth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    console.log("Authorization Header:", authHeader);
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split("Bearer ")[1];
    console.log("extracted token :", token);

    if (!token) {
      return res.status(401).json({ error: "Token missing or malformed" });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if(!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    console.log("User ID from token:", req.user);

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

//cors is used to allow cross-origin requests
// it is used to allow requests from different ports

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth', authRouter);
app.use("/api/emails", auth, emailRouter);
// app.use('/uploads', express.static('uploads'));
app.use("/api/upload", auth, uploadRouter);
app.use("/api/shared-library", auth, sharedLibraryRouter);
app.use("/api/qna", auth , qnaRouter);
app.use("/api/lostnfound", auth, lostAndFoundRouter);


server.listen(process.env.PORT, () => {
  console.log('server started');
  console.log('Socket.IO chat enabled');
});