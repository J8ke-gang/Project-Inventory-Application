import pool from './db.js';

const seedDatabase = async () => {
  try {
    // Insert categories
    await pool.query('INSERT INTO categories (name) VALUES ($1), ($2)', ['Impact Wrenches', 'Drills']);

    // Insert brands
    await pool.query('INSERT INTO brands (name) VALUES ($1), ($2)', ['DeWalt', 'Makita']);

    // Insert tools
    await pool.query(`
      INSERT INTO tools (name, brand_id, category_id, drive_size, voltage, price, description, image_url)
      VALUES
      ('DeWalt Impact Wrench', 1, 1, '1/2 inch', '20V', 159.99, 'Powerful impact wrench.', 'https://example.com/dewalt-impact.jpg'),
      ('Makita Cordless Drill', 2, 2, 'N/A', '18V', 119.99, 'Lightweight drill for precise work.', 'https://example.com/makita-drill.jpg');
    `);
    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    pool.end(); // Close the connection
  }
};

seedDatabase();
