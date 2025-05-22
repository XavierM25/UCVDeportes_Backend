import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { SubcategoriaAttributes } from "../interface/Subcategorias";
import Categoria from "./Categoria";

type SubcategoriaCreation = Optional<SubcategoriaAttributes, "id_subcategoria">;

class Subcategoria extends Model<SubcategoriaAttributes, SubcategoriaCreation> {}

Subcategoria.init(
  {
    id_subcategoria: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_subcategoria: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categoria_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Categoria, key: "id_categoria" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    sequelize,
    modelName: "Subcategoria",
    tableName: "subcategorias",
    timestamps: false,
  }
);

Subcategoria.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });

export default Subcategoria;