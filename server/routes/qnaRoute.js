import { Router } from "express";
import {
  getAllCategories,
  getAllQuestions,
  createCategory,
  createQuestion,
  editCategory,
  editQuestion,
  deleteCategory,
  deleteQuestion,
  getQuestionsByCategory
} from "../controllers/qnaController.js";

const qnaRouter = Router();

qnaRouter.get("/categories", getAllCategories);
qnaRouter.get("/questions", getAllQuestions);
qnaRouter.post("/category", createCategory);
qnaRouter.post("/question", createQuestion);
qnaRouter.patch("/category/:id", editCategory);
qnaRouter.patch("/question/:id", editQuestion);
qnaRouter.delete("/category/:id", deleteCategory);
qnaRouter.delete("/question/:id", deleteQuestion);
qnaRouter.get("/category/:id/questions", getQuestionsByCategory);

export default qnaRouter;