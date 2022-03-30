'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helpers/bycrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Item, {foreignKey: 'authorId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username harus diisi"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Format Email is not Valid"
        },
        notEmpty: {
          msg: "Email is Required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is Required"
        },
        isLength: {
          args: [5],
          msg: "Panjang minimal password 5 karakter"
        }
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          msg: "Role is Required"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};