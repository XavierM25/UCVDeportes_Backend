import { Router } from 'express';
import { obtenerRankings } from '../controllers/ranking/rankingObtener';
import { filterRankings } from '../controllers/ranking/filterRankings';

const router = Router();

router.get('/', obtenerRankings);
router.post('/filter', filterRankings);


export default router; 