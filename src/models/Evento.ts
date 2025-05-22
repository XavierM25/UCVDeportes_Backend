import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { EventoAttributes } from "../interface/Eventos";
import Subcategoria from "./Subcategoria";

type EventoCreation = Optional<EventoAttributes, "id_evento">;

class Evento extends Model<EventoAttributes, EventoCreation> {}

Evento.init(
  {
    id_evento: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_evento: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lugar: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subcategoria_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Subcategoria, key: "id_subcategoria" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    estado: {
      type: DataTypes.ENUM("activo", "inactivo"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Evento",
    tableName: "eventos",
    timestamps: false,
  }
);

Evento.belongsTo(Subcategoria, { foreignKey: "subcategoria_id", as: "subcategoria" });

export default Evento;