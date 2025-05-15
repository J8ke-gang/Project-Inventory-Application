import express from 'express';
import { getToolsByCategory, getToolById } from '../controllers/toolsController.js';
const router = express.Router();

router.get('/:category', getToolsByCategory);
router.get('/tool/:id', getToolById);

export default router;
