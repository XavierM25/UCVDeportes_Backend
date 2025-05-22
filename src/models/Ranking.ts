import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { RankingAttributes } from "../interface/Rankings";
import Estudiante from "./Estudiante";
import Categoria from "./Categoria";

type RankingCreation = Optional<RankingAttributes, "id_ranking">;

class Ranking extends Model<RankingAttributes, RankingCreation> {}

Ranking.init(
  {
    id_ranking: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    id_estudiante: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Estudiante, key: "id_estudiante" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    puntos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_registro: {
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
  },
  {
    sequelize,
    modelName: "Ranking",
    tableName: "rankings",
    timestamps: false,
  }
);

Ranking.belongsTo(Estudiante, { foreignKey: "id_estudiante", as: "estudiante" });
Ranking.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });

export default Ranking;