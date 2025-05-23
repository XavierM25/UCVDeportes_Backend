import { Router } from 'express';
import { login } from '../controllers/sesion/login';
import { register } from '../controllers/sesion/register';

const router = Router();

router.post('/login', login);
router.post('/register', register);

export default router; 