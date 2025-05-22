import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { OtpAttributes } from "../interface/Otp";
import Usuario from "./Usuario";

type OtpCreation = Optional<OtpAttributes, "id_otp">;

class Otp extends Model<OtpAttributes, OtpCreation> {}

Otp.init(
  {
    id_otp: {
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
    codigo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_generacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    vencido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    usado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Otp",
    tableName: "otp",
    timestamps: false,
  }
);

Otp.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });

export default Otp;