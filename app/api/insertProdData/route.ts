import { NextRequest, NextResponse } from "next/server";
import { ProductionStart, ProductionStop } from "../../../model/MongoStructcture";
import { connectToDatabase } from "../../../lib/mongodb";
import { verifyIdToken } from "../../../lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { userId, productCount, action, timestamp, idToken, userEmail } = body;

    // ✅ Check if required fields are present
    if (!userId || !action || !timestamp || !idToken || !userEmail) {
      console.error("❌ Missing required fields:", { userId, action, timestamp, idToken, userEmail });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Verify Firebase ID Token
    try {
      const decodedToken = await verifyIdToken(idToken);
      if (decodedToken.uid !== userId) {
        console.error("❌ Authentication failed for user:", userId);
        return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
      }
    } catch (authError) {
      console.error("❌ Invalid authentication token:", authError);
      return NextResponse.json({ error: "Invalid authentication token" }, { status: 401 });
    }

    // ✅ Insert data into the relevant collection
    try {
      if (action === "start") {
        if (!productCount) {
          console.error("❌ Missing productCount for 'start' action");
          return NextResponse.json({ error: "Product count is required for 'start' action" }, { status: 400 });
        }
        const newProduction = new ProductionStart({ userEmail, action, productCount, timestamp });
        await newProduction.save();
      } else if (action === "stop") {
        const newStop = new ProductionStop({ userEmail, action, timestamp });
        await newStop.save();
      } else {
        console.error("❌ Invalid action:", action);
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }

      console.log(`✅ ${action.toUpperCase()} action saved successfully`);
      return NextResponse.json({ success: true, message: "Data inserted successfully" });

    } catch (dbError) {
      console.error("❌ Database insertion failed:", dbError);
      return NextResponse.json({ error: "Database insertion failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
