export interface InscripcionAttributes {
  id_inscripcion: number
  id_usuario: number
  id_evento: number
  fecha_inscripcion: Date
  estado: 'pendiente' | 'confirmada' | 'cancelada'
}
