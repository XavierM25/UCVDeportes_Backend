import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { ContenidoAttributes } from "../interface/Contenido";
import Categoria from "./Categoria";

type ContenidoCreation = Optional<ContenidoAttributes, "id_contenido">;

class Contenido extends Model<ContenidoAttributes, ContenidoCreation> {}

Contenido.init(
  {
    id_contenido: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo_contenido: {
      type: DataTypes.ENUM("video", "artículo", "imagen"),
      allowNull: false,
    },
    titulo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    modelName: "Contenido",
    tableName: "contenido",
    timestamps: false,
  }
);

Contenido.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });

export default Contenido;