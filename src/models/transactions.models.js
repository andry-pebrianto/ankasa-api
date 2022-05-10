const db = require('../config/db');

const transactionsModels = {
  createTransaction: (setData) => new Promise((resolve, rejectt) => {
    db.query(
      'INSERT INTO transactions (product_id, airline_id, is_paid, user_id, seat, total_order, id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        setData.product_id,
        setData.airline_id,
        setData.is_paid,
        setData.user_id,
        setData.seat,
        setData.totalOrder,
        setData.id,
      ],
      (err, result) => {
        if (err) {
          rejectt(err);
        }
        resolve(result);
      },
    );
  }),
  paid: (transactionId) => new Promise((resolve, rejectt) => {
    db.query(
      'UPDATE transactions SET is_paid=$1 WHERE id=$2',
      [true, transactionId],
      (err, result) => {
        if (err) {
          rejectt(err);
        }
        resolve(result);
      },
    );
  }),
  getTransactions: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM transactions inner join products ON transactions.product_id = products.id inner join airlines on transactions.airline_id = airlines.id;', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  getDetailTransactions: (id) => new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM transactions WHERE id=$1',
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  }),
  deleteTransactions: (id, userId) => new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM transactions WHERE id=$1 AND user_id=$2',
      [id, userId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  }),
  getTransactionByUser: (userId) => new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM transactions WHERE user_id=$1',
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  }),
};

module.exports = transactionsModels;
