import { Request, Response, NextFunction } from 'express';
import Ranking from '../../models/Ranking';
import Usuario from '../../models/Usuario';
import Categoria from '../../models/Categoria';

export const filterRankings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { categoria_id } = req.body;
    if (typeof categoria_id !== 'number') {
      res.status(400).json({ success: false, message: 'categoria_id debe ser un número.' });
      return;
    }
    const rankings = await Ranking.findAll({
      where: { categoria_id },
      order: [['puntos', 'DESC']],
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id_usuario', 'nombre', 'apellido_paterno', 'apellido_materno', 'carrera', 'ruta_imagen'] },
        { model: Categoria, as: 'categoria', attributes: ['id_categoria', 'nombre_categoria'] }
      ]
    });
    res.status(200).json({ success: true, data: rankings });
  } catch (error) {
    next(error);
  }
};
