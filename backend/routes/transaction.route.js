import express from 'express';
const router = express.Router()
import {initializeTransaction,transactions} from '../controllers/transaction.controller.js';

router.get('/initialize', initializeTransaction);
router.get('/', transactions);

export default router;

