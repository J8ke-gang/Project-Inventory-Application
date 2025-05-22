import express from "express";
import pool from "../db/database.js";

const router = express.Router();

// Root test route
router.get("/", (req, res) => {
  res.json({ message: "Cart route works" });
});

// Get items in cart
router.get("/items/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const items = await pool.query(
      `SELECT cart_items.*, tools.name, tools.price
       FROM cart_items JOIN tools ON cart_items.tool_id = tools.id 
       WHERE cart_id = $1`,
      [cartId]
    );
    res.json(items.rows);
  } catch (err) {
    console.error("Get items error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add item to cart
router.post("/items", async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Add item error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete cart item
router.delete("/items/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const result = await pool.query("DELETE FROM cart_items WHERE id = $1", [
      itemId,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error("Delete cart item error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update quantity
router.patch("/items/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    await pool.query("UPDATE cart_items SET quantity = $1 WHERE id = $2", [
      quantity,
      itemId,
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create/get cart by user ID
router.get("/:userId", async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Get/create cart error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

