import Ticket from "@/app/models/Ticket";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { emailId } = params;

  const result = await Ticket.find({ userEmail: emailId });
  return NextResponse.json(result, { status: 200 });
}
