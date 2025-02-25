"use client";
import { useEffect, useState } from "react";
import VPNStatus from "@/app/components/VPNStatus";

export default function VPNPage() {
  const [vpnKey, setVpnKey] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem("vpnKey");
    if (!storedKey) {
      alert("Encryption key is required.");
      window.location.href = "/landing";
    } else {
      setVpnKey(storedKey);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">VPN Connection</h1>
      <VPNStatus />
    </div>
  );
}
