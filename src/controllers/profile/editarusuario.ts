import { Request, Response, NextFunction } from 'express';
import Usuario from '../../models/Usuario';
import { userSchema } from '../../schemas/userSchema';
import validate from '../../utils/validate';

export const editarUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { isValid, errors } = validate(userSchema, req.body);
    if (!isValid) {
      res.status(400).json({ success: false, message: 'Datos inválidos', errors });
      return;
    }
    const userId = Number(req.params.id_usuario);
    const usuario = await Usuario.findByPk(userId);
    if (!usuario) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
      return;
    }

    const { correo_electronico } = req.body;
    if (
      correo_electronico &&
      correo_electronico !== usuario.get('correo_electronico')
    ) {
      const exists = await Usuario.findOne({ where: { correo_electronico } });
      if (exists) {
        res.status(400).json({ success: false, message: 'Correo electrónico ya en uso.' });
        return;
      }
    }

    await usuario.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Perfil actualizado exitosamente.',
      data: usuario
    });
  } catch (error) {
    next(error);
  }
};
