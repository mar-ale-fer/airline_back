'use strict';
import { Model } from 'sequelize';

interface CommentAttributes {
  id: number;
  text: string;
  tags: string;
}

module.exports = (sequelize: any, DataTypes: any) => {

  class Comment extends Model<CommentAttributes>
    implements CommentAttributes {
    id!: number;
    text!: string;
    tags!: string;
    static associate(models: any) {
      Comment.belongsTo(models.Flight, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
      Comment.belongsTo(models.User, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
      Comment.belongsTo(models.Airline, {
        foreignKey: { allowNull: false },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
    }
  };
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};