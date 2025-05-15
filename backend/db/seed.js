import pool from "./app.js";

const seedTools = async () => {
  try {
    // Drop the table if it exists
    await pool.query("DROP TABLE IF EXISTS tools");

    // Create the tools table
    await pool.query(`
      CREATE TABLE tools (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        in_stock BOOLEAN NOT NULL,
        category TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL
      );
    `);

    // Insert initial data
    await pool.query(`
      INSERT INTO tools (name, quantity, in_stock, category, price) VALUES
        ('Cordless 20V Dewalt Drill', 10, true, 'Power Tool', 150.99),
        ('Cordless 20V Dewalt Impact Gun 1/2"', 5, true, 'Power Tool', 329.00),
        ('Cordless 20V Dewalt Impact Gun 3/8"', 10, true, 'Power Tool', 285.00),
        ('Cordless 20V Dewalt Ratchet 3/8"', 6, true, 'Power Tool', 200.00),

        ('Mac Tools 3-Pc Hammer set', 5, true, 'Hand Tool', 256.00),
        ('Mac Tools 4-Pc Pry Bar Set', 8, true, 'Hand Tool', 344.00),
        ('Mac Tools 53-Pc 1/4" Drive combo set', 5, true, 'Hand Tool', 1120.00),
        ('Mac Tools 65-Pc 3/8" Drive combo set', 8, true, 'Hand Tool', 1500.00),
        ('Mac Tools 33-Pc 12-pt combo wrench set', 4, true, 'Hand Tool', 1047.00),
        ('Mac Tools 17-Pc Screw Driver Set', 8, true, 'Hand Tool', 601.00),

        ('Snap-On 144" 26 Drawer Roll Cab (Combat Tan)', 2, true, 'Tool Box', 47130.00),
        ('Snap-On 60" 10-Drawer Roll Cab (Storm Gray)', 2, true, 'Tool Box', 18980.00)
    `);

    console.log("✅ Seed complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedTools();
