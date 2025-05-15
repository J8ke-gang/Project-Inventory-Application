import pool from "../db/app.js";

export const getToolsByCategory = async (req, res) => {
  const category = decodeURIComponent(req.params.category).toLowerCase().trim();

  try {
    const query = "SELECT * FROM tools WHERE LOWER(category) = $1";
    const result = await pool.query(query, [category]);
    const tools = result.rows;
    res.json(tools);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tools");
  }
};

