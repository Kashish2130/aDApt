import express from "express";
import { getAllEmails, createEmail, updateEmail, deleteEmail } from "../controllers/emailController.js";

const emailRouter = express.Router();

//http://localhost:5000/api/emails/

emailRouter.get("/", getAllEmails);
emailRouter.post("/", createEmail);
emailRouter.patch("/:id", updateEmail);
emailRouter.delete("/:id", deleteEmail);

export default emailRouter;

