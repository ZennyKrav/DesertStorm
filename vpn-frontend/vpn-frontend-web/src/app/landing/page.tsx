"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [key, setKey] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      // Store encryption key (to be used for authentication in VPN page)
      localStorage.setItem("vpnKey", key);
      router.push("/vpn");
    } else {
      alert("Please enter a valid encryption key.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Enter Your Encryption Key</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter encryption key..."
          className="p-2 border rounded-md text-black"
        />
        <button type="submit" className="bg-blue-600 p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
