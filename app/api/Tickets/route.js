import { capitalizeFirstLetter } from "@/app/(utils)/utils";
import Ticket from "@/app/models/Ticket";
import UserCategory from "@/app/models/UserCategory";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tickets = await Ticket.find();

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketData = body.formData;

    if (ticketData.category == "Add a new category") {
      const countOfDocument = await UserCategory.countDocuments({
        category: capitalizeFirstLetter(ticketData.customCategory),
      });

      if (countOfDocument == 0) {
        await UserCategory.create({
          userEmail: ticketData.userEmail,
          category: capitalizeFirstLetter(ticketData.customCategory),
        });
        ticketData.category = ticketData.customCategory;
      }
    }

    await Ticket.create(ticketData);

    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
