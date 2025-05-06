import pool from "../db/db.js";

export const getAllTools = async (req, res) => {
  const result = await pool.query("SELECT * FROM tools");
  res.json(result.rows);
};

export const getToolById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM tools WHERE id = $1", [id]);
  res.json(result.rows[0]);
};
