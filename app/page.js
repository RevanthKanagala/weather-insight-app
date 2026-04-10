"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("latestWeather");
    if (saved) {
      try {
        setWeather(JSON.parse(saved));
      } catch {
        localStorage.removeItem("latestWeather");
      }
    }
  }, []);

  async function handleFetchWeather() {
    try {
      setError("");
      setSuggestions(null);
      setLoadingWeather(true);

      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to fetch weather");
      }

      setWeather(data.weather);
      localStorage.setItem("latestWeather", JSON.stringify(data.weather));
    } catch (err) {
      setWeather(null);
      setSuggestions(null);
      setError(err.message || "Something went wrong");
    } finally {
      setLoadingWeather(false);
    }
  }

async function handleGetSuggestions() {
  try {
    setError("");
    setLoadingSuggestions(true);

    if (!weather) {
      throw new Error("Fetch weather first");
    }

    const res = await fetch("/api/suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weather }),
    });

    const text = await res.text();
    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error("Server returned an invalid response");
    }

    if (!res.ok || !data.ok) {
      throw new Error(data.error || "Failed to get suggestions");
    }

    setSuggestions(data.suggestions);
  } catch (err) {
    setSuggestions(null);
    setError(err.message || "Something went wrong");
  } finally {
    setLoadingSuggestions(false);
  }
}
  
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold">Weather Insight App</h1>
        <p className="mb-6 text-gray-600">
          Get weather-based travel, risk, and activity suggestions.
        </p>

        <div className="mb-4 flex gap-3">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 rounded-lg border p-3"
          />
          <button
            onClick={handleFetchWeather}
            disabled={loadingWeather}
            className="rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
          >
            {loadingWeather ? "Loading..." : "Fetch Weather"}
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </div>
        ) : null}

        {weather ? (
          <div className="mb-6 rounded-xl border p-4">
            <h2 className="mb-3 text-xl font-semibold">Weather Summary</h2>
            <div className="space-y-2 text-sm">
              <p><strong>City:</strong> {weather.city}</p>
              <p><strong>Country:</strong> {weather.country}</p>
              <p><strong>Main:</strong> {weather.weather?.main}</p>
              <p><strong>Description:</strong> {weather.weather?.description}</p>
              <p><strong>Temperature:</strong> {weather.weather?.temperature_c} °C</p>
              <p><strong>Feels Like:</strong> {weather.weather?.feels_like_c} °C</p>
              <p><strong>Humidity:</strong> {weather.weather?.humidity}</p>
              <p><strong>Wind Speed:</strong> {weather.weather?.wind_speed}</p>
            </div>

            <button
              onClick={handleGetSuggestions}
              disabled={loadingSuggestions}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-3 text-white disabled:opacity-50"
            >
              {loadingSuggestions ? "Generating..." : "Get AI Suggestions"}
            </button>
          </div>
        ) : null}

        {suggestions ? (
          <div className="rounded-xl border p-4">
            <h2 className="mb-3 text-xl font-semibold">AI Suggestions</h2>
            <div className="space-y-3 text-sm">
              <p><strong>Travel Suggestion:</strong> {suggestions.travel_suggestion}</p>
              <p><strong>Risk Alert:</strong> {suggestions.risk_alert}</p>
              <p><strong>Activity Recommendation:</strong> {suggestions.activity_recommendation}</p>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
