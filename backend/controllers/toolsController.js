import pool from "../db/app.js";

export const getToolsByCategory = async (req, res) => {
  const category = decodeURIComponent(req.params.category).toLowerCase().trim();

  try {
    const query = "SELECT * FROM tools WHERE LOWER(REPLACE(category, ' ', '')) = $1";
    const result = await pool.query(query, [category]);
    console.log("Category requested:", category);
    console.log("Tools found:", result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tools by category");
  }
};

export const getToolById = async (req, res) => {
  const id = req.params.id;

  try {
    const query = "SELECT * FROM tools WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tool not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tool by ID");
  }
};

