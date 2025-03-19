import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";

export async function GET(req: NextRequest) {
    try {
        const db = (await connectToDatabase()).connection.db;

        // Fetch data from both collections
        const productionStarts = await db.collection("productionstarts")
            .find({})
            .sort({ timestamp: -1 })
            .toArray();

        const productionStops = await db.collection("productionstops")
            .find({})
            .sort({ timestamp: -1 })
            .toArray();

        return NextResponse.json({
            productionStarts,
            productionStops
        });

    } catch (error) {
        console.error("Error fetching production data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}