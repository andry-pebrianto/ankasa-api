const exrpress = require('express');
const {
  getTransactions,
  createTransactions,
  getDetailTransactions,
  deleteTransactions,
  getTransactionsByUser,
  confirmPaid,
} = require('../controllers/transactions.controller');
const jwtAuth = require('../middlewares/jwtAuth');
const transactionValidation = require('../validations/transaction.validation');
const runValidation = require('../middlewares/runValidation');

const router = exrpress.Router();

router
  .post('/transactions/:id', jwtAuth, transactionValidation.post, runValidation, createTransactions)
  .get('/transactions', jwtAuth, getTransactions)
  .get('/transactions/:id', jwtAuth, getDetailTransactions)
  .delete('/transactions/:id', jwtAuth, deleteTransactions)
  .get('/userTransactions', jwtAuth, getTransactionsByUser)
  .put('/transactions/:id/paid', jwtAuth, confirmPaid);

module.exports = router;
