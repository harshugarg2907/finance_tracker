'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpinnerCircle1 from "@/components/ui/SpinnerCircle1";

export default function DashboardSummary({ transactions }: { transactions: any[] }) {
  if (!transactions || transactions.length === 0) return null;

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categorySummary = transactions.reduce((acc: any, tx) => {
    const cat = tx.category || 'Other';
    acc[cat] = (acc[cat] || 0) + tx.amount;
    return acc;
  }, {});

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mt-8 mb-2">
      
      {/* Total Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          ₹{total.toFixed(2)}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          {Object.entries(categorySummary).map(([cat, amt]) => (
            <div key={cat} className="flex justify-between">
              <span>{cat}</span>
              <span>₹{Number(amt).toFixed(2)}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          {recent.map((tx) => (
            <div key={tx._id} className="flex justify-between">
              <span>{tx.description}</span>
              <span>₹{tx.amount}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
