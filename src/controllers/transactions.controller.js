const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const transactionsModels = require('../models/transactions.models');
const { success, failed } = require('../utils/createResponse');

const transactionsController = {
  createTransactions: async (req, res) => {
    try {
      const id = uuidv4();

      const seat = [];
      for (let i = 0; i <= req.body.totalOrder; i++) {
        seat.push(crypto.randomBytes(5).toString('hex').toUpperCase());
      }

      const setData = {
        product_id: req.params.id,
        airline_id: req.body.airline_id,
        is_paid: false,
        totalOrder: req.body.totalOrder,
        seat: seat.join(', '),
        user_id: req.APP_DATA.tokenDecoded.id,
        id,
      };

      const transactions = await transactionsModels.createTransaction(setData);
      success(res, {
        code: 200,
        payload: transactions,
        message: 'success create transactions!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getTransactions: async (req, res) => {
    try {
      const transactions = await transactionsModels.getTransactions();
      success(res, {
        code: 200,
        payload: transactions.rows,
        message: 'get all transactions success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getDetailTransactions: async (req, res) => {
    try {
      const { id } = req.params;

      const transactions = await transactionsModels.getDetailTransactions(id);
      success(res, {
        code: 200,
        payload: transactions.rows[0],
        message: 'get detail transactions success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  deleteTransactions: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const transactions = await transactionsModels.deleteTransactions(
        id,
        userId,
      );
      if (transactions.rowCount) {
        success(res, {
          code: 200,
          payload: transactions,
          message: 'successs delete transactions!',
        });
      } else {
        failed(res, {
          code: 500,
          payload: null,
          message: "you can't delete this!",
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  getTransactionsByUser: async (req, res) => {
    try {
      // const { userId } = req.body;
      const userId = req.APP_DATA.tokenDecoded.id;
      const transactions = await transactionsModels.getTransactionByUser(
        userId,
      );
      success(res, {
        code: 200,
        payload: transactions.rows,
        message: 'success get transactions by user!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
  confirmPaid: async (req, res) => {
    try {
      await transactionsModels.paid(req.params.id);

      success(res, {
        code: 200,
        payload: null,
        message: 'success paid!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'internal server error!',
      });
    }
  },
};

module.exports = transactionsController;
