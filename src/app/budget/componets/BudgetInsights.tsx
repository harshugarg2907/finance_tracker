'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BudgetInsights({ budgets, transactions }: {
  budgets: any[],
  transactions: any[]
}) {
  if (!budgets.length || !transactions.length) return null;

  const insights: string[] = [];

  const categoryMap = budgets.reduce((acc: Record<string, number>, b) => {
    acc[b.category] = Number(b.amount);
    return acc;
  }, {});

  const actuals: Record<string, number> = {};

  transactions.forEach(tx => {
    const cat = tx.category || 'Other';
    actuals[cat] = (actuals[cat] || 0) + tx.amount;
  });

  Object.entries(categoryMap).forEach(([category, budgetAmount]) => {
    const spent = actuals[category] || 0;
    const percentage = ((spent / budgetAmount) * 100).toFixed(1);

    if (spent > budgetAmount) {
      insights.push(`⚠️ Over budget in ${category} by ₹${(spent - budgetAmount).toFixed(2)}`);
    } else {
      insights.push(`✅ ${category}: ${percentage}% of budget used.`);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {insights.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </CardContent>
    </Card>
  );
}
