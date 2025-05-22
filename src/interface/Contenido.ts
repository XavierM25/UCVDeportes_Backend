export interface ContenidoAttributes {
  id_contenido: number
  tipo_contenido: 'video' | 'artículo' | 'imagen'
  titulo: string
  descripcion: string
  fecha_publicacion: Date
  categoria_id: number
  estado: 'activo' | 'inactivo'
}
