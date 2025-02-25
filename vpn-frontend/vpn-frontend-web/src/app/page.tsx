"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("vpnKey", key);
      router.push("/vpn");
    } else {
      setError("Invalid encryption key. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-6">
      {/* DesertStorm Title */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#EDC9AF" }}>DesertStorm</h1>

      {/* Encryption Key Input Section */}
      <h2 className="text-2xl font-semibold mb-4">Enter Your Encryption Key</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Encryption Key..."
          className="p-3 border rounded-md text-black w-64 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md text-white">
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
