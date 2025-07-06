import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(){
       await connectDB();
       const transaction = await Transaction.find().sort({date:-1});
       return NextResponse.json(transaction);
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const tx = await Transaction.create(body);
    return NextResponse.json(tx);

}
