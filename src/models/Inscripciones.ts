import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { InscripcionAttributes } from "../interface/Inscripciones";
import Usuario from "./Usuario";
import Evento from "./Evento";

type InscripcionCreation = Optional<InscripcionAttributes, "id_inscripcion">;

class Inscripcion extends Model<InscripcionAttributes, InscripcionCreation> {}

Inscripcion.init(
  {
    id_inscripcion: {
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
    id_evento: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: Evento, key: "id_evento" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    fecha_inscripcion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "confirmada", "cancelada"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Inscripcion",
    tableName: "inscripciones",
    timestamps: false,
  }
);

Inscripcion.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });
Inscripcion.belongsTo(Evento, { foreignKey: "id_evento", as: "evento" });

export default Inscripcion;