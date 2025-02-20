// app/api/example/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Your API logic here
  return NextResponse.json({ message: "Example API endpoint" });
}

export async function POST() {
  // Your API logic here
  return NextResponse.json({ message: "POST request received" });
}