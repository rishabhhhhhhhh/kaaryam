import { capitalizeFirstLetter } from "@/app/(utils)/utils";
import Ticket from "@/app/models/Ticket";
import UserCategory from "@/app/models/UserCategory";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  const foundTicket = await Ticket.findOne({ _id: id });
  return NextResponse.json({ foundTicket }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;

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

    await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });

    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
