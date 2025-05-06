import pool from "../db/db.js";

export const getAllTools = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tools");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
