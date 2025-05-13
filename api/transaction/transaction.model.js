const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const TransactionSchema = new Schema({
    account:{type:Schema.Types.ObjectId, ref:'Account', required: true},
    price: { type: Number, required: true },
    datetime: { type: Date, required: true },
    description: {type: String, required: true},
}, { timestamps: true })

const TransactionModel = model('Transaction', TransactionSchema)

module.exports = { TransactionModel }