import { Router, Request, Response } from 'express';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    await login(req, res);
});

export default router; 