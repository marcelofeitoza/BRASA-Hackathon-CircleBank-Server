'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Loans.init({
    userId: DataTypes.INTEGER,
    productType: DataTypes.STRING,
    productSubType: DataTypes.STRING,
    currency: DataTypes.STRING,
    contractAmount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Loans',
  });
  return Loans;
};