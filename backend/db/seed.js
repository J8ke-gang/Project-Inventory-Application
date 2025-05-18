import pool from "./database.js";

const seedTools = async () => {
  try {
    // Drop the table if it exists
    await pool.query("DROP TABLE IF EXISTS tools");

    // Create the tools table with image_url column
    await pool.query(`
      CREATE TABLE tools (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        in_stock BOOLEAN NOT NULL,
        category TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        image_url TEXT
      );
    `);

    // Insert initial data and image URLs
    await pool.query(`
      INSERT INTO tools (name, quantity, in_stock, category, price, image_url) VALUES
        ('Cordless 20V Dewalt Drill', 10, true, 'powertools', 150.99, '/images/cordless-drill.jpg'),
        ('Cordless 20V Dewalt Impact Gun 1/2"', 5, true, 'powertools', 329.00, '/images/impact-gun-half.jpg'),
        ('Cordless 20V Dewalt Impact Gun 3/8"', 10, true, 'powertools', 285.00, '/images/impact-gun-three-eighths.jpg'),
        ('Cordless 20V Dewalt Ratchet 3/8"', 6, true, 'powertools', 200.00, '/images/ratchet.jpg'),

        ('Mac Tools 3-Pc Hammer set', 5, true, 'handtools', 256.00, '/images/hammer-set.jpg'),
        ('Mac Tools 4-Pc Pry Bar Set', 8, true, 'handtools', 344.00, '/images/pry-bar-set.jpg'),
        ('Mac Tools 53-Pc 1/4" Drive combo set', 5, true, 'handtools', 1120.00, '/images/drive-combo-quarter.jpg'),
        ('Mac Tools 65-Pc 3/8" Drive combo set', 8, true, 'handtools', 1500.00, '/images/drive-combo-three-eighths.jpg'),
        ('Mac Tools 33-Pc 12-pt combo wrench set', 4, true, 'handtools', 1047.00, '/images/wrench-set.jpg'),
        ('Mac Tools 17-Pc Screw Driver Set', 8, true, 'handtools', 601.00, '/images/screwdriver-set.jpg'),

        ('Snap-On 144" 26 Drawer Roll Cab (Combat Tan)', 2, true, 'toolboxes', 47130.00, '/images/rollcab-combat.jpg'),
        ('Snap-On 60" 10-Drawer Roll Cab (Storm Gray)', 2, true, 'toolboxes', 18980.00, '/images/rollcab-gray.jpg')
    `);

    console.log("✅ Seed complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedTools();
