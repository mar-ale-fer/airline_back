'use strict';
import { Model } from 'sequelize';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mustChangePassword: boolean;
  backend: boolean; //is a platform's IT backender?
  roles: string; //{"roles" : "['ADMIN','PILOT','OCC','RAMP','GATE','AIRLINE']"}
}

module.exports = (sequelize: any, DataTypes: any) => {

  class User extends Model<UserAttributes>
    implements UserAttributes {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    mustChangePassword!: boolean;
    password!: string;
    backend!: boolean;
    roles!: string;
    static associate(models: any) {
      User.belongsTo(models.Airline, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
      User.hasMany(models.Comment, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mustChangePassword: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};