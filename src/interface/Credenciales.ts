export interface CredencialAttributes {
  id_credencial: number
  id_usuario: number
  usuario: string
  contrasena: string
  ultimo_acceso: Date | null
  intentos_fallidos: number
  bloqueado: boolean
}