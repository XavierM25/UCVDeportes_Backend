import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { CredencialAttributes } from "../interface/Credenciales";
import Usuario from "./Usuario";

type CredencialCreation = Optional<CredencialAttributes, "id_credencial">;

class Credencial extends Model<CredencialAttributes, CredencialCreation> {}

Credencial.init(
  {
    id_credencial: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Usuario, key: "id_usuario" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    usuario: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ultimo_acceso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    intentos_fallidos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    bloqueado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Credencial",
    tableName: "credenciales",
    timestamps: false,
  }
);

Credencial.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });

export default Credencial;