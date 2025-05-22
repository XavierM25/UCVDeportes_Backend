import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { CategoriaAttributes } from "../interface/Categorias";

type CategoriaCreation = Optional<CategoriaAttributes, "id_categoria">;

class Categoria extends Model<CategoriaAttributes, CategoriaCreation> {}

Categoria.init(
  {
    id_categoria: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_categoria: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Categoria",
    tableName: "categorias",
    timestamps: false,
  }
);

export default Categoria;