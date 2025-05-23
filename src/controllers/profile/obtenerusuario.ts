import { Request, Response, NextFunction } from 'express';
import Usuario from '../../models/Usuario';

export const obtenerUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id_usuario);
    
    const usuario = await Usuario.findByPk(id, {
      attributes: [
        'id_usuario',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'correo_electronico',
        'estado',
        'rol',
        'fecha_registro',
        'fecha_nacimiento',
        'carrera',
        'campus',
        'celular',
        'ruta_imagen'
      ]
    });

    if (!usuario) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json({ success: true, data: usuario });
  } catch (error) {
    next(error);
  }
};
