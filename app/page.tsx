// app/page.tsx — Javari Travel
// AI trip planning, deals discovery, and travel content
// Affiliates: Klook 106921, Discover Cars royhenders, Squaremouth 23859
// CR AudioViz AI · EIN 39-3646201 · May 2026
"use client";
import { useState } from "react";

const TOOLS = [
  { icon: "🗺️", label: "Trip Planner",      desc: "Full itinerary in seconds",               href: "/trip-planner" },
  { icon: "🏨", label: "Hotel Finder",       desc: "AI-curated stays for every budget",        href: "/hotels" },
  { icon: "✈️", label: "Flight Hacks",        desc: "Find cheaper fares with AI tips",          href: "/flights" },
  { icon: "🚗", label: "Car Rentals",         desc: "Best rates via Discover Cars",             href: "/cars" },
  { icon: "🎟️", label: "Activities",          desc: "Klook experiences worldwide",              href: "/activities" },
  { icon: "🛡️", label: "Travel Insurance",    desc: "Coverage via Squaremouth",                 href: "/insurance" },
  { icon: "📸", label: "Destination Guide",   desc: "AI-written local guides and tips",         href: "/destinations" },
  { icon: "🌎", label: "Packing List",        desc: "Smart packing list for any destination",   href: "/packing" },
];

const DESTINATIONS = [
  { name: "Naples, FL",    emoji: "🌴", tagline: "White sand beaches & world-class dining" },
  { name: "Paris, France", emoji: "🗼", tagline: "The city of light awaits" },
  { name: "Kyoto, Japan",  emoji: "⛩️",  tagline: "Ancient temples and cherry blossoms" },
  { name: "Cancun, MX",   emoji: "🏖️", tagline: "All-inclusive paradise" },
];

export default function TravelHome() {
  const [destination, setDestination] = useState("");
  const [nights, setNights] = useState("7");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

  async function planTrip() {
    if (!destination.trim()) return;
    setLoading(true); setItinerary("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: `Create a ${nights}-day travel itinerary for ${destination}. Include: daily schedule with morning/afternoon/evening activities, top restaurants for each day, accommodation recommendations (budget, mid-range, luxury options), transportation tips, estimated daily budget, and must-know local tips.` }],
          stream: false,
          systemOverride: "You are an expert travel planner with firsthand knowledge of destinations worldwide. Create detailed, practical, and exciting itineraries that balance popular attractions with hidden gems. Include specific restaurant names, neighborhoods, and local tips."
        }),
      });
      const data = await res.json();
      setItinerary(data?.choices?.[0]?.message?.content || data?.content || "Error.");
    } catch { setItinerary("Connection error."); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#040912", color: "#e2e8f0", fontFamily: "system-ui" }}>
      <nav style={{ background: "#1E3A5F", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>✈️</span>
          <span style={{ fontWeight: 800, color: "#00B4D8", fontSize: 15 }}>Javari Travel</span>
        </div>
        <a href="https://craudiovizai.com/auth/signup" style={{ background: "#FF0800", color: "#fff", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>Sign Up Free</a>
      </nav>

      <section style={{ background: "linear-gradient(135deg,#1E3A5F,#040912)", padding: "64px 24px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", lineHeight: 1.05 }}>
            Plan Your Dream Trip<br /><span style={{ color: "#00B4D8" }}>in 30 Seconds</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.65, margin: "0 0 32px" }}>
            AI-powered itineraries, hotel picks, car rentals, activities, and travel insurance.
            One platform for every trip.
          </p>
        </div>
      </section>

      {/* Trip planner */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 0" }}>
        <div style={{ background: "#0F1F32", border: "1px solid rgba(0,180,216,0.12)", borderRadius: 16, padding: "24px 28px" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#fff" }}>AI Trip Planner</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <input value={destination} onChange={e => setDestination(e.target.value)}
              placeholder="Where are you going? (e.g. Tokyo, Japan)"
              style={{ flex: 2, minWidth: 200, background: "#172D48", border: "1px solid rgba(0,180,216,0.15)", borderRadius: 8, padding: "11px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "system-ui" }} />
            <select value={nights} onChange={e => setNights(e.target.value)}
              style={{ background: "#172D48", border: "1px solid rgba(0,180,216,0.15)", borderRadius: 8, padding: "11px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "system-ui" }}>
              {["3","5","7","10","14"].map(n => <option key={n} value={n}>{n} nights</option>)}
            </select>
            <button onClick={planTrip} disabled={loading || !destination.trim()}
              style={{ background: loading || !destination.trim() ? "#0F1F32" : "#FF0800", color: loading || !destination.trim() ? "#374151" : "#fff", border: "none", borderRadius: 8, padding: "11px 20px", fontSize: 13, fontWeight: 700, cursor: loading || !destination.trim() ? "not-allowed" : "pointer", fontFamily: "system-ui", whiteSpace: "nowrap" }}>
              {loading ? "Planning..." : "🗺️ Plan My Trip"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {DESTINATIONS.map(d => (
              <button key={d.name} onClick={() => setDestination(d.name)}
                style={{ background: "#172D48", border: "1px solid rgba(0,180,216,0.1)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#9CA3AF", cursor: "pointer", fontFamily: "system-ui" }}>
                {d.emoji} {d.name}
              </button>
            ))}
          </div>
          {itinerary && (
            <div style={{ marginTop: 16, padding: "14px 16px", background: "rgba(0,180,216,0.05)", border: "1px solid rgba(0,180,216,0.12)", borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#00B4D8" }}>{nights}-Day Itinerary: {destination}</span>
                <button onClick={() => navigator.clipboard?.writeText(itinerary)} style={{ background: "transparent", color: "#6B7280", border: "none", fontSize: 11, cursor: "pointer", fontFamily: "system-ui" }}>Copy</button>
              </div>
              <pre style={{ margin: 0, fontSize: 13, color: "#e2e8f0", lineHeight: 1.65, whiteSpace: "pre-wrap", fontFamily: "system-ui", maxHeight: 400, overflowY: "auto" }}>{itinerary}</pre>
            </div>
          )}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "48px 20px 72px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(18px,3vw,28px)", fontWeight: 800, color: "#fff", margin: "0 0 32px" }}>All Travel Tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {TOOLS.map(t => (
            <a key={t.href} href={t.href} style={{ background: "#0F1F32", border: "1px solid rgba(0,180,216,0.08)", borderRadius: 14, padding: "18px 16px", textDecoration: "none", display: "block" }}>
              <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>{t.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0", marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.4 }}>{t.desc}</div>
            </a>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "#374151" }}>
          Affiliate partners: Klook (ID: 106921) · Discover Cars (royhenders) · Squaremouth (23859)
        </p>
      </section>

      <footer style={{ borderTop: "1px solid rgba(0,180,216,0.08)", padding: "14px 24px", textAlign: "center" }}>
        <p style={{ color: "#374151", fontSize: 11, margin: 0 }}>
          © 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Some links may be affiliate links
        </p>
      </footer>
    </div>
  );
}