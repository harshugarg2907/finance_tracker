'use client';
import { useEffect, useState } from "react";
import DashboardSummary from "./components/DashboardSummary";
import CategoryPieChart from "./components/CategoryPieChart";
import SpinnerCircle1 from "@/components/ui/SpinnerCircle1";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      } finally {
        setLoading(false); // ✅ MUST SET THIS
      }
    };

    fetchdata();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {loading && <div className='h-2 w-full flex justify-center items-center'><SpinnerCircle1></SpinnerCircle1></div>}
      <DashboardSummary transactions={transactions}  />
      <CategoryPieChart transactions={transactions}  />
    </div>
  );
}
