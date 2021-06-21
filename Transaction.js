const mongoose = require("mongoose")

const TransactSchema = mongoose.Schema({
    fromAccount: String,
    fromAccountName: String,
    toAccount: String,
    toAccountName: String,
    amount: Number,
    time: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model("Transaction", TransactSchema)