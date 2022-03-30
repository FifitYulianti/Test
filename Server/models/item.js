'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Item.belongsTo(models.User, {foreignKey: 'authorId'})
      Item.hasMany(models.Ingredient, {foreignKey: 'itemId'})
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is Required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is Required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is Required"
        },
        isPrice(price) {
          if (price < 5000) {
            throw new Error("Harga Item minimal Rp. 5.000")
          }
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image is Required"
        }
      }
    },
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    ingredient: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};