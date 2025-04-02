import { NextRequest, NextResponse } from "next/server";
import { ProductionStart, ProductionStop } from "../../../model/MongoStructcture";
import { connectToDatabase } from "../../../lib/mongodb";
import { verifyIdToken } from "../../../lib/firebaseAdmin";

const ESP8266_BASE_URL = "http://192.168.1.4:89";

export async function POST(req: NextRequest) {
  try {
    // 1. Database and Auth Setup
    await connectToDatabase();
    const body = await req.json();
    const { userId, productCount, action, timestamp, idToken, userEmail } = body;

    // 2. Validation
    if (!userId || !action || !timestamp || !idToken || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    // 3. Firebase Auth
    try {
      const decodedToken = await verifyIdToken(idToken);
      if (decodedToken.uid !== userId) {
        return NextResponse.json(
          { error: "Authentication failed" }, 
          { status: 401 }
        );
      }
    } catch (authError) {
      return NextResponse.json(
        { error: "Invalid authentication token" }, 
        { status: 401 }
      );
    }

    // 4. Prepare ESP8266 Request
    let espUrl = "http://192.168.1.4:89";
    let espPayload: Record<string, unknown> = {};

    if (action === "start") {
      if (typeof productCount !== "number") {
        return NextResponse.json(
          { error: "productCount must be a number" },
          { status: 400 }
        );
      }
      espUrl = `${ESP8266_BASE_URL}/start`;
      espPayload = { productCount };
    } else if (action === "stop") {
      espUrl = `${ESP8266_BASE_URL}/emergency_stop`;
      espPayload = {};
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    // 5. Call ESP8266
    let espResponse: Response;
    try {
      espResponse = await fetch(espUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(espPayload),
      });

      if (!espResponse.ok) {
        const errorText = await espResponse.text();
        throw new Error(`ESP8266 responded with ${espResponse.status}: ${errorText}`);
      }
    } catch (err) {
      const error = err as Error;
      return NextResponse.json(
        { error: `ESP communication failed: ${error.message}` },
        { status: 502 }
      );
    }

    // 6. Process ESP Response
    let espData: unknown;
    try {
      espData = await espResponse.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid response from ESP8266" },
        { status: 502 }
      );
    }

    // 7. Save to MongoDB
    try {
      if (action === "start") {
        await new ProductionStart({ 
          userEmail, 
          action, 
          productCount: Number(productCount), 
          timestamp 
        }).save();
      } else {
        await new ProductionStop({ 
          userEmail, 
          action, 
          timestamp 
        }).save();
      }
    } catch (dbError) {
      const error = dbError as Error;
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // 8. Return Success
    return NextResponse.json({
      success: true,
      espResponse: espData,
      message: `${action} command executed`
    });

  } catch (err) {
    // Type-safe error handling
    const error = err as Error;
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}