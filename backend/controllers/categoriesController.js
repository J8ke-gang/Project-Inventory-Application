import pool from "../db/app.js";

// Controller function to get all categories
export const getCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT category FROM tools");
    const categories = result.rows;
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching categories");
  }
};
