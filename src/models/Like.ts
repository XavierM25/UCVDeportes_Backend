import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { LikeAttributes } from "../interface/Likes";
import Usuario from "./Usuario";
import Contenido from "./Contenido";

type LikeCreation = Optional<LikeAttributes, "id_like">;

class Like extends Model<LikeAttributes, LikeCreation> {}

Like.init(
  {
    id_like: {
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
    id_contenido: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Contenido, key: "id_contenido" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Like",
    tableName: "likes",
    timestamps: false,
  }
);

Like.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });
Like.belongsTo(Contenido, { foreignKey: "id_contenido", as: "contenido" });

export default Like;