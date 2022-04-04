const router = require("express").Router();

const verify = require("./verifyToken");

const {
  getAccounts,
  getAccountsTransactions,
  getAccountsBalances,
  getCardsDetailed,
  getFinancing,
  getLoans,
} = require("../controller/bankController");

// accounts
router.get("/accounts", verify, getAccounts);
router.get("/accounts/balances", verify, getAccountsBalances);
router.get("/accounts/transactions", verify, getAccountsTransactions);

router.get("/cards", verify, getCardsDetailed);

// financing
router.get("/financing", verify, getFinancing);

// loans
router.get("/loans", verify, getLoans);

module.exports = router;
