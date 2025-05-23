export interface UsuarioAttributes {
  id_usuario: number
  nombre: string
  apellido_paterno: string
  apellido_materno: string
  correo_electronico: string
  contrasena: string
  estado: 'activo' | 'inactivo' | 'pendiente'
  fecha_registro: Date
  rol: 'estudiante' | 'administrador' | 'docente'
  fecha_nacimiento?: Date | null
  carrera?: string | null
  campus?: string | null
  celular?: string | null
  ruta_imagen?: string | null
}
