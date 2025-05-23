import { Request, Response, NextFunction } from 'express';
import Ranking from '../../models/Ranking';
import Usuario from '../../models/Usuario';
import Categoria from '../../models/Categoria';

export const obtenerRankings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { categoria_id } = req.query;
    const where: any = {};
    if (categoria_id) where.categoria_id = Number(categoria_id);

    const rankings = await Ranking.findAll({
      where,
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