"use client";
import { useState } from "react";

export default function VPNStatus() {
  const [status, setStatus] = useState("Disconnected");

  const handleConnect = async () => {
    setStatus("Connecting...");
    // API Placeholder: Replace with real connection API
    setTimeout(() => {
      setStatus("Connected");
    }, 2000);
  };

  const handleDisconnect = async () => {
    setStatus("Disconnecting...");
    // API Placeholder: Replace with real disconnect API
    setTimeout(() => {
      setStatus("Disconnected");
    }, 2000);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl">VPN Status: {status}</h2>
      <div className="mt-4">
        {status !== "Connected" ? (
          <button onClick={handleConnect} className="bg-green-600 p-2 rounded-md">
            Connect
          </button>
        ) : (
          <button onClick={handleDisconnect} className="bg-red-600 p-2 rounded-md">
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
