const {
  getUserAccount,
  getUserfinancing,
  getUserTransactions,
  getUserLoans,
  getUserCards,
} = require("../services/bankDb");
const {
  getOpenfinanceCardsDetailed,
  listOpenfinanceAccounts,
  getOpenFinanceFinancingDetailed,
  getOpenfinanceAccountsBalances,
  getOpenfinanceAllAccountsTransactions,
  getOpenfinanceLoansDetailed,
} = require("../services/openFinance");

const getCardsDetailed = async (req, res) => {
  try {
    let totalCredit = 0;
    const openFinanceCards = await getOpenfinanceCardsDetailed(
      req.userCpf,
      "69665991-da55-4aac-a1f2-32d23daba8fe"
    );
    const userCards = await getUserCards(req.userId);

    allCards = [...userCards.userCards, ...openFinanceCards[0]];
    allCards.forEach((card) => {
      totalCredit += card.availableAmount || 0;
    });
    const data = {
      userCards,
      allCards,
      totalCredit,
    };

    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getFinancing = async (req, res) => {
  try {
    const openFinanceFinancing = await getOpenFinanceFinancingDetailed(
      req.userCpf,
      "69665991-da55-4aac-a1f2-32d23daba8fe"
    );
    const userFinancing = await getUserfinancing(req.userId);

    const data = {
      userFinancing,
      allFinancing: [...userFinancing.userFinancing, openFinanceFinancing[0]],
    };
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getLoans = async (req, res) => {
  try {
    const openFinanceLoans = await getOpenfinanceLoansDetailed(
      req.userCpf,
      "69665991-da55-4aac-a1f2-32d23daba8fe"
    );
    const userLoans = await getUserLoans(req.userId);

    const data = {
      userLoans,
      allLoans: [...userLoans.userLoans, openFinanceLoans[0]],
    };
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getAccounts = async (req, res) => {
  try {
    const openFinanceAccounts = await listOpenfinanceAccounts(
      req.userCpf,
      "69665991-da55-4aac-a1f2-32d23daba8fe"
    );
    const userAccount = await getUserAccount(req.userId);

    const data = {
      userAccount,
      allAccounts: [userAccount, ...openFinanceAccounts],
    };
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getAccountsBalances = async (req, res) => {
  try {
    let totalBalance = 0;
    const openFinanceAccountsBalances = await getOpenfinanceAccountsBalances(
      req.userCpf,
      "69665991-da55-4aac-a1f2-32d23daba8fe"
    );
    const userAccount = await getUserAccount(req.userId);
    allAccounts = [userAccount, ...openFinanceAccountsBalances];
    allAccounts.forEach((account) => {
      totalBalance += account.availableAmount || 0;
    });
    const data = {
      userAccount,
      allAccounts,
      totalBalance,
    };
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getAccountsTransactions = async (req, res) => {
  try {
    const openFinanceAccountsTransactions =
      await getOpenfinanceAllAccountsTransactions(req.userCpf, [
        "69665991-da55-4aac-a1f2-32d23daba8fe",
      ]);
    const { userTransactions } = await getUserTransactions(req.userId);
    const data = {
      userTransactions,
      allTransactions: [
        ...userTransactions,
        ...openFinanceAccountsTransactions[0],
      ],
    };
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getCardsDetailed,
  getFinancing,
  getLoans,
  getAccounts,
  getAccountsBalances,
  getAccountsTransactions,
};
