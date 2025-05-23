import { Schema } from "ajv";

export const userSchema: Schema = {
  type: "object",
  properties: {
    nombre: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      errorMessage: "El nombre es obligatorio y debe tener entre 1 y 255 caracteres."
    },
    apellido_paterno: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      errorMessage: "El apellido paterno es obligatorio y debe tener hasta 255 caracteres."
    },
    apellido_materno: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      errorMessage: "El apellido materno es obligatorio y debe tener hasta 255 caracteres."
    },
    correo_electronico: {
      type: "string",
      format: "email",
      errorMessage: "El correo electrónico debe tener un formato válido."
    },
    rol: {
      type: "string",
      enum: ["estudiante", "administrador", "docente"],
      errorMessage: "El rol debe ser 'estudiante', 'administrador' o 'docente'."
    },
    fecha_nacimiento: {
      type: "string",
      format: "date",
      errorMessage: "La fecha de nacimiento debe tener un formato válido (YYYY-MM-DD)."
    },
    carrera: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      errorMessage: "La carrera es obligatoria y debe tener entre 1 y 255 caracteres."
    },
    campus: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      errorMessage: "El campus es obligatorio y debe tener entre 1 y 255 caracteres."
    },
    celular: {
      type: "string",
      pattern: "^[0-9]{9}$",
      errorMessage: "El celular debe contener exactamente 9 dígitos."
    },
    ruta_imagen: {
      type: "string",
      maxLength: 512,
      errorMessage: "La ruta de imagen no debe superar los 512 caracteres."
    }
  },
  required: [
    "nombre",
    "apellido_paterno",
    "apellido_materno",
    "correo_electronico",
    "rol",
    "fecha_nacimiento",
    "carrera",
    "campus",
    "celular"
  ],
  additionalProperties: false
};
