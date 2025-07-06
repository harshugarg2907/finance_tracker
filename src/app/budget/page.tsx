// File: app/budget/page.tsx
'use client';

import { useEffect, useState } from 'react';
import BudgetForm from './componets/BudgetForm';
import BudgetChart from './componets/BudgetCharts';
import BudgetInsights from './componets/BudgetInsights';

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [budgetRes, txRes] = await Promise.all([
        fetch('/api/budgets'),
        fetch('/api/transactions'),
      ]);
      const budgetData = await budgetRes.json();
      const txData = await txRes.json();
      setBudgets(budgetData);
      setTransactions(txData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
     <h1 className="text-3xl font-bold mb-4">Charts</h1> 
      <BudgetForm onAdd={fetchData} />

      <div className="mt-6">
        <BudgetChart budgets={budgets} transactions={transactions} loading={loading} />
      </div>

      <div className="mt-6">
        <BudgetInsights budgets={budgets} transactions={transactions} />
      </div>
    </div>
  );
}
