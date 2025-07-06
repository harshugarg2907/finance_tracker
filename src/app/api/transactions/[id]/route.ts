import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse, NextRequest } from "next/server";

// Type definition for the params
interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    // Await the params promise (required in Next.js 13+ App Router)
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await connectDB();
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting transaction', error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    // Await the params promise (required in Next.js 13+ App Router)
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ message: "Missing transaction ID" }, { status: 400 });
    }

    await connectDB();
    const body = await req.json();
    const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      { message: "Error updating transaction", error: (error as Error).message },
      { status: 500 }
    );
  }
}
