import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { VideoAttributes } from "../interface/Videos";
import Categoria from "./Categoria";

type VideoCreation = Optional<VideoAttributes, "id_video">;

class Video extends Model<VideoAttributes, VideoCreation> {}

Video.init(
  {
    id_video: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_subida: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    vistas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoria_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Categoria, key: "id_categoria" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    estado: {
      type: DataTypes.ENUM("activo", "inactivo"),
      allowNull: false,
      defaultValue: "activo",
    },
  },
  {
    sequelize,
    modelName: "Video",
    tableName: "videos",
    timestamps: false,
  }
);

Video.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });

export default Video;