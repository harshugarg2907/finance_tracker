'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SpinnerCircle1 from '@/components/ui/SpinnerCircle1';

export default function BudgetChart({ budgets, transactions, loading }: {
  budgets: any[],
  transactions: any[],
  loading: boolean
}) {
  if (loading) {
    return <div className='h-10 flex justify-center items-center'><SpinnerCircle1/></div>;
  }

  const categoryMap = budgets.reduce((acc: any, b) => {
    acc[b.category] = { budget: b.amount, actual: 0 };
    return acc;
  }, {});

  transactions.forEach(tx => {
    const cat = tx.category || 'Other';
    if (!categoryMap[cat]) {
      categoryMap[cat] = { budget: 0, actual: 0 };
    }
    categoryMap[cat].actual += tx.amount;
  });

  const data = Object.entries(categoryMap).map(([category, values]: [string, any]) => ({
    category,
    Budgeted: values.budget,
    Spent: values.actual,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budgeted" fill="#8884d8" />
            <Bar dataKey="Spent" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
