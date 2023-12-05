import { capitalizeFirstLetter } from "@/app/(utils)/utils";
import Ticket from "@/app/models/Ticket";
import UserCategory from "@/app/models/UserCategory";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tickets = await Ticket.find();

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketData = body.formData;

    if (ticketData.category == "Add a new category") {
      console.log("Found a new category : " + ticketData);
      const countOfDocument = await UserCategory.countDocuments({
        category: capitalizeFirstLetter(ticketData.customCategory),
      });
      console.log("Documents Count : " + countOfDocument);

      if (countOfDocument == 0) {
        console.log(
          "Creating new document with category: " + ticketData.category
        );
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
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
