import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { UsuarioAttributes } from "../interface/Usuarios";

type UsuarioCreation = Optional<UsuarioAttributes, "id_usuario">;

class Usuario extends Model<UsuarioAttributes, UsuarioCreation> {}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    apellido_paterno: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    apellido_materno: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    contrasena: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("activo", "inactivo", "pendiente"),
      allowNull: false,
      defaultValue: "pendiente",
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    rol: {
      type: DataTypes.ENUM("estudiante", "administrador", "docente"),
      allowNull: false,
      defaultValue: "estudiante",
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    carrera: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    campus: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    celular: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ruta_imagen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false,
  }
);

export default Usuario;
