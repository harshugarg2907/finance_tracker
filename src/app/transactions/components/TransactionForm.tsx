'use client'

import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";


export default function TransactionForm({ onAdd, editData, clearEdit }: { onAdd: () => void, editData?: any, clearEdit?: () => void }) {

    const [form, setForm] = useState({ amount: '', date: '', description: '' });

    useEffect(() => {
        if (editData) {
            setForm({
                amount: editData.amount.toString(),
                date: new Date(editData.date).toISOString().split('T')[0],
                description: editData.description,
            });
        }
    }, [editData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault;
        try {
            if (editData) {
                await fetch(`/api/transactions/${editData._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: parseFloat(form.amount),
                        date: new Date(form.date),
                        description: form.description,
                    }),
                });
                clearEdit && clearEdit();
            } else {
                await fetch('/api/transactions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: parseFloat(form.amount),
                        date: new Date(form.date),
                        description: form.description,
                    }),
                });
                setForm({ amount: '', date: '', description: '' })
                onAdd();
            }
        }
        catch (error) {
            console.error('Failed to save transaction:', error);
        }
    }

    return (
        <CardContent className="flex flex-col sm:flex-row justify-between items-center py-5 w-full">
            <form onSubmit={handlesubmit} className="w-full space-y-2">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        required
                        className="w-full sm:w-1/3"
                    />
                    <Input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="w-full sm:w-1/3"
                    />
                    <Input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        className="w-full sm:w-1/3"
                    />
                </div>

                <Button type="submit">{editData ? 'Update' : 'Add'} Transaction</Button>
            </form>
        </CardContent>
    );

}