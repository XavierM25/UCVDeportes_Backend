export interface CredentialsInterface {
    id:number;
    id_usuario: number;
    usuario: string;
    contrasena: string;
    ultimo_acceso: Date;
    intentos_fallidos: number;
    bloqueado: boolean;
}

interface CredentialsUsuario extends CredentialsInterface {
    usuario_id: number;
}