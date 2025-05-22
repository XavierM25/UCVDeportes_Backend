export interface VideoAttributes {
  id_video: number
  titulo: string
  descripcion: string
  url: string
  fecha_subida: Date
  vistas: number
  categoria_id: number
  estado: 'activo' | 'inactivo'
}
