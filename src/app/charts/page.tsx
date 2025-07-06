'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  Cell,
} from 'recharts';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ChartsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then(setTransactions)
      .catch((err) => console.error('Failed to fetch transactions:', err));
  }, []);

  // Group by date (daily)
  const dailyData = transactions.reduce((acc: any, tx) => {
    const date = new Date(tx.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + tx.amount;
    return acc;
  }, {});
  const dailyChart = Object.entries(dailyData).map(([date, amount]) => ({
    date,
    amount,
  }));

  // Group by month
  const monthlyData = transactions.reduce((acc: any, tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {});
  const monthlyChart = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  // Group by category
  const categoryData = transactions.reduce((acc: any, tx) => {
    const category = tx.category || 'Other';
    acc[category] = (acc[category] || 0) + tx.amount;
    return acc;
  }, {});
  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#4F46E5', '#06B6D4', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

  return (
    <div>
        <h1 className="text-3xl font-bold mb-4">Charts</h1>

        
    <div className="grid gap-6 md:grid-cols-2">

      {/* Monthly Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChart}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="amount" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyChart}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="amount" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Pie Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Category-wise Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
        </div>
  );
}
