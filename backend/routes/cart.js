import express from "express";
const router = express.Router();
import pool from "../db/database.js";

///create cart
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  let cart = await pool.query("SELECT * FROM carts WHERE user_id = $1", [
    userId,
  ]);

  if (cart.rows.length === 0) {
    cart = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
      [userId]
    );
  }

  res.json(cart.rows[0]);
});

/// get items in cart
router.get("/items/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const items = await pool.query(
    `
      SELECT cart_items.*, tools.name, tools.price
      FROM cart_items JOIN tools ON cart_items.tool_id = tools.id 
      WHERE cart_id = $1`,
    [cartId]
  );
  res.json(items.rows);
});

// add item to cart
router.post("/items", async (req, res) => {
  const { cart_id, tool_id, quantity } = req.body;

  const existing = await pool.query(
    "SELECT * FROM cart_items WHERE cart_id = $1 AND tool_id = $2",
    [cart_id, tool_id]
  );

  if (existing.rows.length > 0) {
    await pool.query(
      "UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2",
      [quantity, existing.rows[0].id]
    );
  } else {
    await pool.query(
      "INSERT INTO cart_items (cart_id, tool_id, quantity) VALUES ($1, $2, $3)",
      [cart_id, tool_id, quantity]
    );
  }

  res.status(201).send("Item added");
});

export default router;
