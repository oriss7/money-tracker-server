const transactionService = require('./transaction.service.js');

module.exports = {
    create,
    query,
    remove,
    get,
    update
}

async function create(req, res) {
    try {
        const { id } = req.params
        const { price, datetime, description } = req.body   
        const transaction = await transactionService.create(id, price, datetime, description)
        return res.json({ transaction })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to create transaction' });
    }
}

async function query(req, res) {
    try{
        const { id } = req.params
        const transactions = await transactionService.query(id)
        if (!transactions) {
            return res.status(404).json({ message: 'Account doesnt have any transactions yet' })
        }
        return res.json({ transactions })
    } catch (error) {
        const status = error.status || 500
        return res.status(status).json({ message: error.message || 'Transactions not found' })
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params
        const deletedtransaction = await transactionService.remove(id)
        if (!deletedtransaction) {
            return res.status(404).json({ message: 'Transaction not found' })
        }
        return res.json({ deletedtransaction })
    } catch (error) {
        const status = error.status || 500
        return res.status(status).json({ message: error.message || 'Transaction not found' })
    }
}

async function get(req, res) {
    try{
        const { id } = req.params
        const transaction = await transactionService.get(id)
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction doesnt found' })
        }
        return res.json({ transaction })
    } catch (error) {
        const status = error.status || 500
        return res.status(status).json({ message: error.message || 'Transaction not found' })
    }
}
async function update(req, res) {
    try {
        const { id } = req.params
        const { price, datetime, description } = req.body
        const updateData = {};
        if (price !== undefined) updateData.price = price;
        if (datetime !== undefined) updateData.datetime = datetime;
        if (description !== undefined) updateData.description = description;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }
        const updatedTransaction = await transactionService.update(id, updateData)
        return res.json({ updatedTransaction })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to update transaction' });
    }
}