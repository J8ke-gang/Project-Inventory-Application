import pool from "../db/database.js";
// get categories
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT category FROM tools");
    const categories = result.rows.map((row) => row.category);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
