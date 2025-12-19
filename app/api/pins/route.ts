import { NextResponse } from "next/server";
import { getPins } from "@/lib/sheets";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get("city");
    
    const pins = await getPins(cityId || undefined);
    return NextResponse.json(pins);
  } catch (error) {
    console.error("Error fetching pins:", error);
    return NextResponse.json({ error: "Failed to fetch pins" }, { status: 500 });
  }
}
