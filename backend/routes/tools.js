import express from "express";
import {
  getAllTools,
  getToolById,
} from "../controllers/toolsController.js";
const router = express.Router();

router.get("/", getAllTools);
router.get("/:id", getToolById);

export default router;
