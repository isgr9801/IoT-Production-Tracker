import { NextRequest, NextResponse } from "next/server";

const ESP8266_BASE_URL = "http://192.168.1.4:89";

export async function POST(req: NextRequest) {
  try {
    const { action, productCount } = await req.json();

    if (!action || (action === "start" && productCount === undefined)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
    }

    let espUrl = "";
    let espOptions: RequestInit = { method: "POST", headers: { "Content-Type": "application/json" } };

    if (action === "start") {
      espUrl = `${ESP8266_BASE_URL}/start`;
      espOptions.body = JSON.stringify({ productCount });
    } else if (action === "stop") {
      espUrl = `${ESP8266_BASE_URL}/emergency_stop`;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    console.log(`🌍 Sending request to ESP8266: ${espUrl}`, espOptions);
    const espResponse = await fetch(espUrl, espOptions);
    const espData = await espResponse.json();

    console.log("✅ ESP8266 Response:", espData);
    return NextResponse.json({ success: true, message: "Command sent successfully", data: espData });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
