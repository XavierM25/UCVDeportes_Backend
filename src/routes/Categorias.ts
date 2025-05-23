import { Router } from 'express';
import { createCategoria } from '../controllers/categorias/guardarcategoria';

const router = Router();

router.post('/', createCategoria);

export default router;
