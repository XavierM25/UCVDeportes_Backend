export interface OtpAttributes {
  id_otp: number
  id_usuario: number
  codigo: string
  fecha_generacion: Date
  vencido: boolean
  usado: boolean
}
