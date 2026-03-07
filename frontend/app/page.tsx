"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(
  () => import("../Map components"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Cab Booking Platform
      </h1>
      <MapComponent />
    </main>
  );
}