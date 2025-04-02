"use client";
import { useEffect, useState } from "react";

export default function ProductionStatus() {
    const [status, setStatus] = useState<{ count: number; error: number } | null>(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await fetch("/api/espStatus");
            const json = await res.json();
            if (json.success) setStatus(json.data);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Live Production Status</h1>
            {status ? (
                <div>
                    <p>Count: {status.count}</p>
                    <p>Error: {status.error}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}