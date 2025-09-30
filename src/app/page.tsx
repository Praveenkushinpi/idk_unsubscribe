"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = async () => {
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || data.error || "Unsubscribed successfully!");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Unsubscribe</h1>
      {email ? (
        <>
          <p className="mb-4">Do you want to unsubscribe <strong>{email}</strong> from our emails?</p>
          <button
            onClick={handleUnsubscribe}
            disabled={loading}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            {loading ? "Processing..." : "Confirm Unsubscribe"}
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </>
      ) : (
        <p>Invalid unsubscribe link.</p>
      )}
    </div>
  );
}
