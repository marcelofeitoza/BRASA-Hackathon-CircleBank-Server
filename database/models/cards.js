'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cards.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    productType: DataTypes.STRING,
    creditCardNetwork: DataTypes.STRING,
    availableAmount: DataTypes.STRING,
    availableAmountCurrency: DataTypes.STRING,
    identificationNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Cards;
};