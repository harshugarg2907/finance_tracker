import { Description } from "@radix-ui/react-dialog";
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    amount:Number,
    description: String,
    date: Date,
    category: {
    type: String,
    enum: ['Food', 'Rent', 'Travel', 'Shopping', 'Utilities', 'Other'],
    default: 'Other'
  }
});


export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

