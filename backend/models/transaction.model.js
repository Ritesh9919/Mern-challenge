import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title:String,
    price:String,
    description:String,
    category:String,
    image:String,
    sold:Boolean,
    dateOfSale:String
})

export const Transaction = mongoose.model('Transaction', transactionSchema);