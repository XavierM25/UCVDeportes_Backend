export interface EventoAttributes {
  id_evento: number
  nombre_evento: string
  descripcion: string
  fecha_inicio: Date
  fecha_fin: Date
  lugar: string
  subcategoria_id: number
  estado: 'activo' | 'inactivo'
}