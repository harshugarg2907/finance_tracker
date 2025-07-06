// File: models/budget.ts
import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  month: String, // e.g., '2025-07'
});

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
