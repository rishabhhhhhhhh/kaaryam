import UserCategory from "@/app/models/UserCategory";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { emailId } = params;

  const result = await UserCategory.find({ userEmail: emailId });
  return NextResponse.json(result, { status: 200 });
}
