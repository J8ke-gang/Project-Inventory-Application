import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  console.log('New contact form submission:', { name, email, message });

  res.status(200).json({ success: true });
});

export default router;
