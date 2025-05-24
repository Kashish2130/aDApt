import { Router } from "express";
import {
  getAllSharedCategories,
  getAllSharedItems,
  createSharedCategory,
  createSharedItem,
  editSharedCategory,
  editSharedItem,
  deleteSharedCategory,
  deleteSharedItem,
  getItemsByCategory
} from "../controllers/sharedResLibController.js";

const sharedLibraryRouter = Router();

sharedLibraryRouter.get("/categories", getAllSharedCategories);
sharedLibraryRouter.get("/items", getAllSharedItems);
sharedLibraryRouter.post("/category", createSharedCategory);
sharedLibraryRouter.post("/item", createSharedItem);
sharedLibraryRouter.patch("/category/:id", editSharedCategory);
sharedLibraryRouter.patch("/item/:id", editSharedItem);
sharedLibraryRouter.delete("/category/:id", deleteSharedCategory);
sharedLibraryRouter.delete("/item/:id", deleteSharedItem);
sharedLibraryRouter.get("/category/:id/items", getItemsByCategory);

export default sharedLibraryRouter;