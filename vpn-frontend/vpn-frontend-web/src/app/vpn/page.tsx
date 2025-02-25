"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VPNStatus from "@/app/components/VPNStatus"; // Ensure the correct file path

export default function VPNPage() {
  const [vpnKey, setVpnKey] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedKey = localStorage.getItem("vpnKey");
    if (!storedKey) {
      alert("Encryption key is required.");
      router.push("/");
    } else {
      setVpnKey(storedKey);
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-6">
      <h1 className="text-2xl font-semibold mb-4">VPN Connection</h1>
      {vpnKey ? <VPNStatus vpnKey={vpnKey} /> : <p>Loading...</p>}
    </div>
  );
}
