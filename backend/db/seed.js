import pool from "./database.js";

const seedTools = async () => {
  try {
    // Drop tables
    await pool.query("DROP TABLE IF EXISTS cart_items");
    await pool.query("DROP TABLE IF EXISTS carts");
    await pool.query("DROP TABLE IF EXISTS users");
    await pool.query("DROP TABLE IF EXISTS tools");

    // Create tools table
    await pool.query(`
  CREATE TABLE tools (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    in_stock BOOLEAN NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    description TEXT
  );
`);

    // Create users table
    await pool.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE
  );
`);

    // Create carts table
    await pool.query(`
  CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
  );
`);

    // Create cart_items table
    await pool.query(`
  CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
    tool_id INTEGER REFERENCES tools(id),
    quantity INTEGER NOT NULL DEFAULT 1
  );
`);

    // Insert test user
    await pool.query(`
  INSERT INTO users (username) VALUES ('testuser');
`);

    // tool data,image URLs and tool descriptions
    await pool.query(`
    INSERT INTO tools (name, quantity, in_stock, category, price, image_url, description) VALUES
    ('Cordless 20V Dewalt Drill', 10, true, 'powertools', 150.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC1RTouCg4vkgT3MCH7Mc0ceSu6XVOK89E3Q&s', 'Complete a variety of drilling applications on the jobsite'),
    ('Cordless 20V Dewalt Impact Gun 1/2"', 5, true, 'powertools', 329.00, 'https://m.media-amazon.com/images/I/515aN0DpeuL._AC_UF894,1000_QL80_.jpg', 'Complete tough jobs utilizing the power of the 20V XR 1/2" High Torque Impact Wrench. Delivering 1,925 Nm of torque and 2,576 Nm of breakaway torque'),
    ('Cordless 20V Dewalt Impact Gun 3/8"', 10, true, 'powertools', 285.00, 'https://images.homedepot.ca/productimages/p_1001689005.jpg?product-images=l', 'Up to 300 ft-lbs of max fastening torque and 450 ft-lbs of max breakaway torque'),
    ('Cordless 20V Dewalt Ratchet 3/8"', 6, true, 'powertools', 200.00, 'https://images.homedepot.ca/productimages/p_1001719235.jpg?product-images=l', 'Brushless motor delivers up to 70 ft-lbs of torque for use with a wide variety of fastener sizes and applications'),

    ('Mac Tools 3-Pc Hammer set', 5, true, 'handtools', 256.00, 'https://www.mactools.ca/cdn/shop/products/CH3AVS.jpg?v=1633813876','(1) 16-Oz. Ball-Peen Hammer (1) 48-Oz. Deadblow Hammer (1) 4-Lbs. Sledge Hammer'),
    ('Mac Tools 4-Pc Pry Bar Set', 8, true, 'handtools', 344.00, 'https://www.mactools.ca/cdn/shop/files/PBS4CO_600x600_crop_center.jpg?v=1732180217', '4 different size or prybars for all types of jobs'),
    ('Mac Tools 53-Pc 1/4" Drive combo set', 5, true, 'handtools', 1120.00, 'https://www.mactools.ca/cdn/shop/products/FOAM7E-14COMBO_1.jpg?v=1654668642', '53-pc 1/4" combo ratchet and socket set'),
    ('Mac Tools 65-Pc 3/8" Drive combo set', 8, true, 'handtools', 1500.00, 'https://www.mactools.ca/cdn/shop/products/FOAM14E-38COMBO_1.jpg?v=1654668664','65-Pc 3/8" Drive combo ratchet and socket set'),
    ('Mac Tools 33-Pc 12-pt combo wrench set', 4, true, 'handtools', 1047.00, 'https://www.mactools.ca/cdn/shop/products/FOAM21E-WRENCH_1.jpg?v=1654668677','33-Pc 12-pt combo wrench set for those tight areas'),
    ('Mac Tools 17-Pc Screw Driver Set', 8, true, 'handtools', 601.00, 'https://www.mactools.ca/cdn/shop/products/FOAM14E-SCREWDR_1.jpg?v=1654668673', '17-Pc Screw Driver Set for all jobs'),

    ('Snap-On 144" 26 Drawer Roll Cab (Combat Tan)', 2, true, 'toolboxes', 47130.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj-AAoT6FW6AWOW7ia93h8eN3BZjbJE_tYEw&s','26 drawer five bank toolbox, 3 extra wide drawers at top to provive easy accsess to most used tools'),
   ('Snap-On 60" 10-Drawer Roll Cab (Storm Gray)', 2, true, 'toolboxes', 18980.00, 'https://snap-on-products-hr.imgix.net/KETN602B0PWZ.jpg?w=600&auto=format', '10 drawer double bank toolbox makes a good starter box')
    `);

    console.log("✅ Seed complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedTools();
