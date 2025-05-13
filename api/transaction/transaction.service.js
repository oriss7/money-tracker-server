const dbService = require('../../services/db.js');
const { TransactionModel } = require('./transaction.model');

module.exports = {
    create,
    query,
    remove,
    get,
    update
}

async function create(account, price, datetime, description) {
  const transaction = await dbService.create(TransactionModel, { account, price, datetime, description })
  await dbService.save(transaction);
  return {
    _id: transaction._id,
    price: transaction.price,
    datetime: transaction.datetime,
    description: transaction.description
  };
}

async function query(accountId) {
    const transactions = await dbService.findByFieldSorted(TransactionModel,
        'account', accountId, 'price datetime description', { datetime: -1 })
    if (!transactions || transactions.length === 0) {
        throw Object.assign(new Error('No transactions found'), { status: 404 })
    }
    return transactions
}

async function remove(transactionId) {
    const deletedTransaction = await dbService.deleteById(TransactionModel, transactionId)
    return deletedTransaction
}

async function get(transactionId) {
    const transaction = await dbService.findById(TransactionModel, transactionId)
    return transaction
}
async function update(transactionId, updateData) {
    const updatedTransaction = await dbService.updateById(TransactionModel, transactionId, updateData)
    return updatedTransaction
}