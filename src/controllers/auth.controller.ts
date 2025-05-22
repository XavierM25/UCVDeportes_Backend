import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';
import { UsuarioAttributes } from '../interface/Usuarios';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            correo_electronico,
            contrasena,
            rol
        } = req.body;

        if (!nombre || !apellido_paterno || !apellido_materno || !correo_electronico || !contrasena || !rol) {
            res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo_electronico)) {
            res.status(400).json({
                success: false,
                message: 'Formato de correo electrónico inválido'
            });
            return;
        }

        const rolesValidos = ['estudiante', 'administrador', 'docente'];
        if (!rolesValidos.includes(rol)) {
            res.status(400).json({
                success: false,
                message: 'Rol inválido'
            });
            return;
        }

        const usuarioExistente = await Usuario.findOne({
            where: { correo_electronico }
        });

        if (usuarioExistente) {
            res.status(400).json({
                success: false,
                message: 'El correo electrónico ya está registrado'
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            correo_electronico,
            contrasena: hashedPassword,
            estado: 'activo',
            fecha_registro: new Date(),
            rol
        });

        const usuarioData = nuevoUsuario.get({ plain: true }) as UsuarioAttributes;

        const token = jwt.sign(
            {
                id: usuarioData.id_usuario,
                correo: usuarioData.correo_electronico,
                rol: usuarioData.rol
            },
            process.env.JWT_SECRET || 'tu_clave_secreta',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                token,
                usuario: {
                    id: usuarioData.id_usuario,
                    nombre: usuarioData.nombre,
                    apellido_paterno: usuarioData.apellido_paterno,
                    apellido_materno: usuarioData.apellido_materno,
                    correo_electronico: usuarioData.correo_electronico,
                    rol: usuarioData.rol
                }
            }
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { correo_electronico, contrasena } = req.body;

        if (!correo_electronico || !contrasena) {
            res.status(400).json({
                success: false,
                message: 'Por favor, proporcione correo electrónico y contraseña'
            });
            return;
        }

        const usuario = await Usuario.findOne({
            where: { correo_electronico }
        });

        if (!usuario) {
            res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
            return;
        }

        const usuarioData = usuario.get({ plain: true }) as UsuarioAttributes;

        if (usuarioData.estado !== 'activo') {
            res.status(401).json({
                success: false,
                message: 'Usuario inactivo o pendiente de activación'
            });
            return;
        }

        const contrasenaValida = await bcrypt.compare(contrasena, usuarioData.contrasena);
        if (!contrasenaValida) {
            res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta'
            });
            return;
        }

        const token = jwt.sign(
            {
                id: usuarioData.id_usuario,
                correo: usuarioData.correo_electronico,
                rol: usuarioData.rol
            },
            process.env.JWT_SECRET || 'tu_clave_secreta',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: {
                token,
                usuario: {
                    id: usuarioData.id_usuario,
                    nombre: usuarioData.nombre,
                    apellido_paterno: usuarioData.apellido_paterno,
                    apellido_materno: usuarioData.apellido_materno,
                    correo_electronico: usuarioData.correo_electronico,
                    rol: usuarioData.rol
                }
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};
