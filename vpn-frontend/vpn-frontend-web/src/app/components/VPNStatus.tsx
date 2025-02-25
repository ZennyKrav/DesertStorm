"use client";
import { useState, useEffect } from "react";

export default function VPNStatus({ vpnKey }: { vpnKey: string }) {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVPNStatus = async () => {
      try {
        const res = await fetch("/api/vpn/status");
        const data = await res.json();
        if (res.ok) {
          setStatus(data.status);
        } else {
          setError("Error fetching status.");
        }
      } catch (err) {
        setError("Network error.");
      }
    };

    fetchVPNStatus();
    const interval = setInterval(fetchVPNStatus, 5000); // Update every 5 sec
    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    setStatus("Connecting...");
    const res = await fetch("/api/vpn/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: vpnKey }),
    });

    const data = await res.json();
    if (res.ok) setStatus("Connected");
    else setError("Failed to connect.");
  };

  const handleDisconnect = async () => {
    setStatus("Disconnecting...");
    const res = await fetch("/api/vpn/disconnect", {
      method: "POST",
    });

    if (res.ok) setStatus("Disconnected");
    else setError("Failed to disconnect.");
  };

  return (
    <div className="text-center">
      <h2 className="text-xl text-white">VPN Status: {status}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        {status !== "Connected" ? (
          <button onClick={handleConnect} className="bg-green-600 px-4 py-2 rounded-md">
            Connect
          </button>
        ) : (
          <button onClick={handleDisconnect} className="bg-red-600 px-4 py-2 rounded-md">
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
