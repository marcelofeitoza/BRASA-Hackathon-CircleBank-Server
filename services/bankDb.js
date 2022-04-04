const Models = require("../database/models");

const { Account, Cards, Financing, Loans, Transactions } = Models;

const getUserAccount = async (userId) => {
  try {
    const userAccount = await Account.findOne({ where: { userId } });
    return userAccount || {};
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUserTransactions = async (userId) => {
  try {
    const userTransactionsArray = await Transactions.findOne({
      where: { userId },
    });
    return { userTransactions: userTransactionsArray || [] };
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUserCards = async (userId) => {
  try {
    const userCardsArray = await Cards.findAll({
      where: { userId },
    });
    return { userCards: userCardsArray || [] };
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUserfinancing = async (userId) => {
  try {
    const userFinancingArray = await Financing.findAll({
      where: { userId },
    });
    return { userFinancing: userFinancingArray || [] };
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUserLoans = async (userId) => {
  try {
    const userLoansArray = await Loans.findAll({
      where: { userId },
    });
    return { userLoans: userLoansArray || [] };
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getUserAccount,
  getUserLoans,
  getUserTransactions,
  getUserCards,
  getUserfinancing,
};
