import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import emailRouter from "./routes/emailRoute.js";
import cors from "cors";
import authRouter from "./routes/authRoute.js";

const server = express();


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

server.get("/",(req,res)=>{
    res.send("Hey!This is my new Node JS project.");
});

//middlewares
const auth = (req, res, next) => {
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
    console.log("Decoded Token:", decoded);

    req.user = decoded;
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

server.use(cors());
server.use(express.json());
server.use('/api/auth', authRouter);
server.use("/api/emails", emailRouter);

server.listen(process.env.PORT,()=>{
    console.log('server started');
})