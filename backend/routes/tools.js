import express from "express";
import { getToolsByCategory } from "../controllers/toolsController.js";

const router = express.Router();

router.get("/image/:id", async (req, res) => {
  try {
    const toolId = req.params.id;
    const result = await pool.query(
      "SELECT image_data FROM tools WHERE id = $1",
      [toolId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Image not found");
    }

    const imageBuffer = result.rows[0].image_data;
    res.set("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/:category", getToolsByCategory);

export default router;
