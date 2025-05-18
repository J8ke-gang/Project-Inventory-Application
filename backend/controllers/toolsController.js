import pool from '../db/database.js';

const normalizeCategory = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes('tool box')) return 'toolboxes';
  if (cat.includes('hand tool')) return 'handtools';
  if (cat.includes('power tool')) return 'powertools';
  return cat;
};

export const getToolsByCategory = async (req, res) => {
  try {
    const rawCategory = req.params.category;
    console.log('Received category:', rawCategory);

    const category = normalizeCategory(rawCategory);
    console.log('Normalized category:', category);

    const result = await pool.query('SELECT * FROM tools WHERE category = $1', [category]);

    console.log('DB returned rows:', result.rows.length);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tools by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
