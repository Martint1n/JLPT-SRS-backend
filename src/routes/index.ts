import express from 'express'
import type { Request, Response } from 'express'
var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next) {
  res.status(200).json({ message: 'Server is running' })
});

export default router;
