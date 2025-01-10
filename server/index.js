import express from "express";
import "dotenv/config";
import { connect } from "mongoose";
import emailRouter from "./routes/emailRoutes.js";
import cors from "cors";

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

server.use(cors());
server.use(express.json());
server.use("/api/emails", emailRouter);

server.listen(process.env.PORT,()=>{
    console.log('server started');
})