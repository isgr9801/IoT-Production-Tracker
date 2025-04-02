"use client";
import { useState } from "react";

const Card = ({ title, description, image }: { title: string; description: string; image: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative flex-1 min-w-[300px] max-w-[400px] h-80 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 text-white flex flex-col justify-end h-full">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className={`text-sm transition-all ${expanded ? "line-clamp-none" : "line-clamp-2"}`}>
          {description}
        </p>

        {/* Expand Button */}
        <button
          className="mt-2 text-sm underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "More"}
        </button>
      </div>
    </div>
  );
};

export default function CardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-center gap-6 mt-4">
      <Card
        title="PLC Delta DVP-14SS2"
        description="The 2nd generation DVP-SS2 series slim type PLC keeps the basic sequential control functions from the DVP-SS series PLC but with faster execution speed and enhanced real-time monitoring capability."
        image="/PLC.jpg"
      />
      <Card
        title="ESP8266"
        description="The ESP8266 is a low-cost, versatile Wi-Fi microcontroller chip. Hv used this chipset to configure webserver to intercommunicate between Webpage and PLC..."
        image="/ESP1.jpg"
      />
      {/* <Card
        title="ESP8266"
        description="WiFi module to set connection between web interface to Delta's PLC."
        image="/ESP1.jpg"
      /> */}
    </div>
  );
}
