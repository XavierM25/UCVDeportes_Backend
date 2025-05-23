import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { RankingAttributes } from "../interface/Rankings";
import Usuario from "./Usuario";
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
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Usuario, key: "id_usuario" },
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

Ranking.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });
Ranking.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });

export default Ranking;
