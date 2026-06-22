import express from 'express'
import type { Request, Response } from 'express'
import prisma from '../prisma.js';
import middlewareToken from '../middleware/middlewareToken.js';
import getNextReviewDate from '../srs.js'

const router = express.Router();

/* GET home page. */
router.get('/getprogress', async(req: Request, res: Response) => {
    try {
        const getProgress = await prisma.progress.findMany();
        res.status(200).json(getProgress);
    } catch (error) {
        console.error('Erreur lors de la récupération des hiraganas:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des hiraganas' });
    }
});

// display hiraganas due for today
router.get('/gethiraganasforreview', middlewareToken, async(req: Request, res: Response) => {
    try{
        if (!req.user) {
            return res.status(401).json({message: "Non autorized"})
        }
        const review = await prisma.progress.findMany({
            where: {
                    userId: req.user.id, 
                    reviewDate: {
                    lte: new Date() }
                },
            include: {hiragana: true}
        })
        // checké pour les hiraganas no progress
        
        res.status(200).json({review, message: "hiraganas for review find"})
    } catch{
        res.status(500).json({message: "error server"})
    }
})

// display ne hiraganas to learn
router.get('/getnewhiraganas', middlewareToken, async(req: Request, res: Response) => {
    try{        
        if (!req.user) {
            return res.status(404).json({message: "Non autorized"})
        }
        const unknownHiraganasArray = await prisma.progress.findMany({
            where: {userId: req.user.id},
            select: {hiraganaId: true}
        }) // renvoie un tableau d'objets au format [{hiraganaId: x}, {...}]
        const unknownHiraganasId = unknownHiraganasArray.map(hiraganas => hiraganas.hiraganaId)
        const userDailyNewCards = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                dailyNewCards: true
            }
        })
        if (userDailyNewCards) {

            const userInfo = await prisma.user.findUnique({
                where: {
                    id: req.user.id
                },
            });
            if (!userInfo) {
                return console.log('Error userInfo null from /getnewhiraganas');
            }
            const unknownHiraganas = await prisma.hiragana.findMany({
                where: {
                    id : {notIn: unknownHiraganasId}
                },
                take: userDailyNewCards.dailyNewCards - userInfo.dailySeenCount
            })
            res.status(200).json({unknownHiraganas, message: 'Daily new cards sent'})
        } else {
            res.status(401).json({message: 'Error in user database, dailyNewCards row'})
        }
    } catch{
        res.status(500).json({message: 'Error server'})
    }
})

//route to update or create progress depending on how user answer the srs card
router.post('/answercard', middlewareToken, async(req: Request, res: Response) => {
    try{
        if (!req.user) {
            return res.status(401).json({message: "Non autorized"});
        }

        const doesHiraganaInProgress = await prisma.progress.findUnique({
            where: {
                userId_hiraganaId: {
                    userId: req.user.id,
                    hiraganaId: req.body.hiraganaId
                }
            }
        })
        if (doesHiraganaInProgress) {
            const newRepetitions = req.body.correct ? doesHiraganaInProgress.repetitions + 1 : 0;
            await prisma.progress.update({
                where: {
                    userId_hiraganaId: {
                        userId: req.user.id,
                        hiraganaId: req.body.hiraganaId
                    }
                },
                data: {
                    reviewDate: new Date(new Date().getTime() + 86400000 * getNextReviewDate(newRepetitions)),
                    repetitions: newRepetitions
                }
            })
            res.status(200).json({message: 'progress updated'})
        } else {
            const newRepetitions = req.body.correct ? 1 : 0;
            await prisma.progress.create({
                data: {
                    userId: req.user.id,
                    hiraganaId: req.body.hiraganaId,
                    reviewDate: new Date(new Date().getTime() + 86400000 * getNextReviewDate(newRepetitions)),
                    repetitions: newRepetitions
                }
            })

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const userInfo = await prisma.user.findUnique({
                where: {
                    id: req.user.id
                },
            });
            if (!userInfo) {
                return console.log('Error userInfo null from answercard');
            }
            await prisma.user.update({
                where: {
                    id: req.user.id
                },
                data: {
                    dailySeenCount : userInfo.lastSeenDate < today ? 1 : { increment: 1 },
                    lastSeenDate: new Date()
                }
            });
            res.status(200).json({message: 'progress created'})
        }
    } catch{
        res.status(500).json({message: 'error server'})
    }
})

export default router;