// File: app/api/budgets/route.ts (GET + POST)
import { connectDB } from '@/lib/db';
import Budget from '@/models/budget';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const created = await Budget.create(body);
  return NextResponse.json(created);
}
