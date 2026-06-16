import express from 'express'
import type { Request, Response } from 'express'
import prisma from '../prisma.js';

const router = express.Router();

/* GET home page. */
router.get('/gethiragana', async(req: Request, res: Response) => {
    try {
        const getHiragana = await prisma.hiragana.findMany();
        res.status(200).json({getHiragana});
    } catch (error) {
        console.error('Erreur lors de la récupération des hiraganas:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des hiraganas' });
    }
});

export default router;