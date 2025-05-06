import express from 'express';
import { getAllTools } from '../controllers/toolsController.js';

const router = express.Router();

router.get('/', getAllTools);

export default router;
