export interface EstudianteAttributes {
  id_estudiante: number
  nombre: string
  apellido_paterno: string
  apellido_materno: string
  correo_electronico: string
  puntos: number
  subcategoria_id: number
  estado: 'activo' | 'inactivo'
}
