'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init({
    accountId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    completedAuthorisedPaymentType: DataTypes.STRING,
    creditDebitType: DataTypes.STRING,
    transactionName: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    transactionCurrency: DataTypes.STRING,
    transactionDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};