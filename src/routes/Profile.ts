import { Router } from 'express';
import { editarUsuario } from '../controllers/profile/editarusuario';
import { obtenerUsuario } from '../controllers/profile/obtenerusuario';

const router = Router();

router.post('/:id_usuario', editarUsuario);
router.get('/:id_usuario', obtenerUsuario);

export default router; 