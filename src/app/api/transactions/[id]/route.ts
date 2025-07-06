import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        await Transaction.findByIdAndDelete(params.id);
        return NextResponse.json({ message: 'Transaction deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting transaction', error }, { status: 500 });
    }

}

export async function PUT(req: Request,context: { params: { id: string } }) {
  const { params } = context;

  try {
    await connectDB();
    const body = await req.json();
        const { id } = context.params; // ✅ no warning here

    const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating transaction', error }, { status: 500 });
  }
}


