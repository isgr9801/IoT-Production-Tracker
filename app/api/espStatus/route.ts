import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI!;

export async function GET() {
    try {
        console.log("Fetching from ESP8266...");
        const res = await fetch("http://192.168.1.4/status"); // Change IP if needed
        const data = await res.json();

        console.log("ESP8266 Response:", data); // Debug

        const client = await MongoClient.connect(mongoUri);
        const db = client.db("esp_data");
        const collection = db.collection("status_logs");
        
        await collection.insertOne({
            ...data,
            timestamp: new Date()
        });

        await client.close();
        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error("Error in API:", err); // Debug
        const errorMessage = err instanceof Error ? err.message : "Unknown error.";
        return NextResponse.json({ success: false, error: errorMessage });


        // this is okkk
    }
}
