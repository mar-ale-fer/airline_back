'use strict';
import { Model } from 'sequelize';

interface FlightAttributes {
  id: number;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {

  class Flight extends Model<FlightAttributes>
    implements FlightAttributes {
    id!: number;
    name!: string;
    static associate(models: any) {
      Flight.hasMany(models.Comment, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
      Flight.belongsTo(models.Airline, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    }
  };
  Flight.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Flight',
    indexes: [
      {
        unique: true,
        fields: ['AirlineId', 'name']
      }
    ]
  });
  return Flight;
};