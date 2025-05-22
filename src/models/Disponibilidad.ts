import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { DisponibilidadAttributes } from "../interface/Disponibilidad";
import Evento from "./Evento";

type DisponibilidadCreation = Optional<DisponibilidadAttributes, "id_disponibilidad">;

class Disponibilidad extends Model<DisponibilidadAttributes, DisponibilidadCreation> {}

Disponibilidad.init(
  {
    id_disponibilidad: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    id_evento: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Evento, key: "id_evento" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    vacantes_disponibles: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    horario: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Disponibilidad",
    tableName: "disponibilidad",
    timestamps: false,
  }
);

Disponibilidad.belongsTo(Evento, { foreignKey: "id_evento", as: "evento" });

export default Disponibilidad;
