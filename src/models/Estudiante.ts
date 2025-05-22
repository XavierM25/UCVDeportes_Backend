import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../core/database";
import { EstudianteAttributes } from "../interface/Estudiantes";
import Subcategoria from "./Subcategoria";

type EstudianteCreation = Optional<EstudianteAttributes, "id_estudiante">;

class Estudiante extends Model<EstudianteAttributes, EstudianteCreation> {}

Estudiante.init(
  {
    id_estudiante: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    apellido_paterno: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    apellido_materno: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    puntos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: "Estudiante",
    tableName: "estudiantes",
    timestamps: false,
  }
);

Estudiante.belongsTo(Subcategoria, { foreignKey: "subcategoria_id", as: "subcategoria" });

export default Estudiante;
