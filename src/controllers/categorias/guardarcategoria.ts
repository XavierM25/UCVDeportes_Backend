import { Request, Response, NextFunction } from 'express';
import Categoria from '../../models/Categoria';

export const createCategoria = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { nombre_categoria, descripcion } = req.body;

    if (!nombre_categoria || typeof nombre_categoria !== 'string') {
      res.status(400).json({ success: false, message: 'nombre_categoria es obligatorio y debe ser texto.' });
      return;
    }

    const nuevaCategoria = await Categoria.create({ nombre_categoria, descripcion });
    res.status(201).json({ success: true, data: nuevaCategoria });
  } catch (error) {
    console.error('Error en createCategoria:', error);
    next(error);
  }
};