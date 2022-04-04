require("dotenv").config();

const axios = require("axios");

// request url
const BASE_URL = process.env.OPEN_FINANCE_API;
const ACCOUNTS_URL = `${BASE_URL}/accounts/v1`;
const CARDS_URL = `${BASE_URL}/credit-cards-accounts/v1`;
const FINANCING_URL = `${BASE_URL}/financings/v1`;
const LOANS_URL = `${BASE_URL}/loans/v1`;

// cards

async function listOpenfinanceCards(cpf, organizationId) {
  const response = await axios({
    method: "get",
    url: `${CARDS_URL}/accounts`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });

  return response.data.data;
}

async function getOpenfinanceCardLimits(cpf, organizationId, cardId) {
  const response = await axios({
    method: "get",
    url: `${CARDS_URL}/accounts/${cardId}/limits`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });
  return response.data.data;
}

async function getOpenfinanceCardsDetailed(cpf, organizationId) {
  let cardsDetailed = [];
  const cards = await listOpenfinanceCards(cpf, organizationId);
  const cardIds = cards.map((card) => {
    return card.creditCardAccountId;
  });
  for (i in cardIds) {
    const cardDetailed = await getOpenfinanceCardLimits(
      cpf,
      organizationId,
      cardIds[i]
    );
    cardsDetailed.push(cardDetailed);
  }
  return cardsDetailed;
}

//financing

async function listOpenfinanceFinancing(cpf, organizationId) {
  const response = await axios({
    method: "get",
    url: `${FINANCING_URL}/contracts`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });
  return response.data.data;
}

async function getOpenfinanceFinancingAmount(cpf, organizationId, financingId) {
  const response = await axios({
    method: "get",
    url: `${FINANCING_URL}/contracts/${financingId}`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });
  return response.data.data;
}

async function getOpenFinanceFinancingDetailed(cpf, organizationId) {
  let financingListDetailed = [];
  const financingList = await listOpenfinanceFinancing(cpf, organizationId);
  const financingIds = financingList.map((financing) => {
    return financing.contractId;
  });
  for (i in financingIds) {
    const financingDetailed = await getOpenfinanceFinancingAmount(
      cpf,
      organizationId,
      financingIds[i]
    );
    financingListDetailed.push(financingDetailed);
  }
  return financingListDetailed;
}

//loans

async function listOpenfinanceLoans(cpf, organizationId) {
  const response = await axios({
    method: "get",
    url: `${LOANS_URL}/contracts`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });
  return response.data.data;
}

async function getOpenfinanceLoanAmount(cpf, organizationId, loanId) {
  const response = await axios({
    method: "get",
    url: `${LOANS_URL}/contracts/${loanId}`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });
  return response.data.data;
}

async function getOpenfinanceLoansDetailed(cpf, organizationId) {
  let loanListDetailed = [];
  const loanList = await listOpenfinanceLoans(cpf, organizationId);
  const loanIds = loanList.map((loan) => {
    return loan.contractId;
  });
  for (i in loanIds) {
    const loanDetailed = await getOpenfinanceLoanAmount(
      cpf,
      organizationId,
      loanIds[i]
    );
    loanListDetailed.push(loanDetailed);
  }
  return loanListDetailed;
}

// accounts

async function listOpenfinanceAccounts(cpf, organizationId) {
  const response = await axios({
    method: "get",
    url: `${ACCOUNTS_URL}/accounts`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });

  return response.data.data;
}

async function getOpenfinanceAccountBalance(cpf, organizationId, accountId) {
  const response = await axios({
    method: "get",
    url: `${ACCOUNTS_URL}/accounts/${accountId}/balances`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });
  return response.data.data;
}

async function getOpenfinanceAccountsBalances(cpf, organizationId) {
  let accountsBalances = [];
  const accounts = await listOpenfinanceAccounts(cpf, organizationId);
  const accountIds = accounts.map((account) => {
    return account.accountId;
  });
  for (i in accountIds) {
    const accountBalance = await getOpenfinanceAccountBalance(
      cpf,
      organizationId,
      accountIds[i]
    );
    accountsBalances.push(accountBalance);
  }
  return accountsBalances;
}

async function getOpenfinanceAccountTransactions(
  cpf,
  accountId,
  organizationId
) {
  const response = await axios({
    method: "get",
    url: `${ACCOUNTS_URL}/accounts/${accountId}/transactions`,
    headers: {
      organizationid: organizationId,
      customerid: cpf,
    },
  });
  return response.data.data;
}

async function getOpenfinanceAllAccountsTransactions(cpf, organizationId) {
  let transactions = [];
  const accounts = await listOpenfinanceAccounts(cpf, organizationId);
  const accountIds = accounts.map((account) => {
    return account.accountId;
  });
  for (i in accountIds) {
    const accountTransactions = await getOpenfinanceAccountTransactions(
      cpf,
      accountIds[i],
      organizationId
    );
    transactions.push(accountTransactions);
  }
  return transactions;
}

module.exports = {
  listOpenfinanceCards,
  listOpenfinanceLoans,
  getOpenfinanceCardsDetailed,
  getOpenFinanceFinancingDetailed,
  getOpenfinanceLoansDetailed,
  listOpenfinanceAccounts,
  getOpenfinanceAccountTransactions,
  getOpenfinanceAllAccountsTransactions,
  getOpenfinanceAccountsBalances,
};
