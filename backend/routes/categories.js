import express from "express";
import { getAllCategories } from "../controllers/categoriesController.js";

const router = express.Router();
//get categories
router.get("/", getAllCategories);

export default router;
