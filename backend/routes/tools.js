import express from 'express';
import { getToolsByCategory } from '../controllers/toolsController.js';

const router = express.Router();

router.get('/:category', getToolsByCategory);

export default router;

