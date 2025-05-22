import express from "express";
const router = express.Router();

//  /api/contact
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  // Validate input fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  // Log the contact form submission
  console.log("New contact form submission:", { name, email, message });

  // Respond with success status
  res.status(200).json({ success: true });
});

export default router;
