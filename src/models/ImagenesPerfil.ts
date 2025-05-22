import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { ImagenPerfilAttributes } from "../interface/ImagenesPerfil";
import Usuario from "./Usuario";

type ImagenPerfilCreation = Optional<ImagenPerfilAttributes, "id_imagen">;

class ImagenPerfil extends Model<ImagenPerfilAttributes, ImagenPerfilCreation> {}

ImagenPerfil.init(
  {
    id_imagen: {
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
    ruta_imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_subida: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "ImagenPerfil",
    tableName: "imagenesperfil",
    timestamps: false,
  }
);

ImagenPerfil.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });

export default ImagenPerfil;