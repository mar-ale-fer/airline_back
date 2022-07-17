'use strict';
import { Model } from 'sequelize';
interface AirlineAttributes {
    id: number;
    name: string;
    active: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {

    class Airline extends Model<AirlineAttributes>
        implements AirlineAttributes {
        id!: number;
        name!: string;
        active!: boolean;
        static associate(models: any) {
            Airline.hasMany(models.User, {
                foreignKey: { allowNull: false },
                onDelete: "RESTRICT",
                onUpdate: "RESTRICT",
            })
            Airline.hasMany(models.Comment, {
                foreignKey: { allowNull: false },
                onDelete: "RESTRICT",
                onUpdate: "RESTRICT",
            });
            Airline.hasMany(models.Flight, {
                foreignKey: { allowNull: false },
                onDelete: "RESTRICT",
                onUpdate: "RESTRICT",
            });
        }
    };
    Airline.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Airline',
    });
    return Airline;
};