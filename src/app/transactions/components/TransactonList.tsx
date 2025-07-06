'use client'

import TransactionForm from "./TransactionForm";
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SpinnerCircle1 from "@/components/ui/SpinnerCircle1";


export default function TransactionList() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editTx, setEditTx] = useState<any>(null);



    const fetchdata = async () => {
        try {
            const res = await fetch('/api/transactions');
            const data = await res.json();
            setTransactions(data);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);

        } finally {
            setLoading(false);

        }

    };
    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
            fetchdata();
        } catch (error) {
            console.error('Failed to delete transaction:', error);
        }
    };





    useEffect(() => { fetchdata() }, []);

    const monthlyData = transactions.reduce((acc: any, tx) => {
        const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + tx.amount;
        return acc;
    }, {});

    const dailyData = transactions.reduce((acc: any, tx) => {
        const day = new Date(tx.date).toLocaleDateString();
        acc[day] = (acc[day] || 0) + tx.amount;
        return acc;
    }, {});

    const chartData2 = Object.entries(dailyData).map(([date, amount]) => ({ date, amount }));


    const chartData = Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }));




    return (
        <div>
            <TransactionForm onAdd={fetchdata} editData={editTx} clearEdit={() => setEditTx(null)} />

            {loading && <div className="flex w-full h-2 justify-center  items-center ">{SpinnerCircle1()}</div>}
            {!loading && transactions.length === 0 && <p>No transactions found.</p>}
            {transactions.map((i) => (
                <div key={i._id}>
                    <Card className="mb-2">
                        <CardContent className="flex h-15 justify-between items-center p-3">
                            <div>
                                <p className="font-medium">{i.description}</p>
                                <p className="text-sm font-semibold text-muted-foreground">
                                    {new Date(i.date).toLocaleDateString()} – ₹{i.amount}
                                </p>
                                <p className="text-red-500 font-semibold">{i.category}</p>
                            </div>
                            <div className='flex gap-2'>

                                <Button onClick={() => setEditTx(i)} className="bg-blue-700">Edit</Button>

                                <Button variant="destructive" onClick={() => handleDelete(i._id)}>Delete</Button>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            ))}

            {/* <Card className="mt-4">
        <CardHeader>
          <CardTitle>Transaction Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={transactions} />
        </CardContent>
      </Card> */}


            


        </div>


    )


}