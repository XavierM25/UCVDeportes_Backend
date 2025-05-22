import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { HistorialRankingAttributes } from "../interface/HistorialRankings";
import Ranking from "./Ranking";

type HistorialCreation = Optional<HistorialRankingAttributes, "id_historial">;

class HistorialRanking extends Model<HistorialRankingAttributes, HistorialCreation> {}

HistorialRanking.init(
  {
    id_historial: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    id_ranking: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Ranking, key: "id_ranking" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    posicion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "HistorialRanking",
    tableName: "historialrankings",
    timestamps: false,
  }
);

HistorialRanking.belongsTo(Ranking, { foreignKey: "id_ranking", as: "ranking" });

export default HistorialRanking;
