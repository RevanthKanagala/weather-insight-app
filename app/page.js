"use client";

import { useEffect, useState } from "react";

const suggestionSections = [
  {
    key: "travel_suggestion",
    eyebrow: "Travel planning",
    title: "Route and commute",
  },
  {
    key: "risk_alert",
    eyebrow: "Safety signal",
    title: "Risk alert",
  },
  {
    key: "activity_recommendation",
    eyebrow: "Day planning",
    title: "Activity recommendation",
  },
];

function formatTemperature(value, digits = 0) {
  return typeof value === "number"
    ? `${value.toFixed(digits)}\u00B0C`
    : "Not available";
}

function formatHumidity(value) {
  return typeof value === "number" ? `${value}%` : "Not available";
}

function formatWindSpeed(value) {
  return typeof value === "number" ? `${value.toFixed(1)} m/s` : "Not available";
}

function formatCoordinates(coordinates) {
  if (
    typeof coordinates?.lat !== "number" ||
    typeof coordinates?.lon !== "number"
  ) {
    return "Not available";
  }

  return `${coordinates.lat.toFixed(2)}, ${coordinates.lon.toFixed(2)}`;
}

function formatTimestamp(value) {
  if (!value) {
    return "No update yet";
  }

  try {
    return new Intl.DateTimeFormat("en-CA", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return "No update yet";
  }
}

function toTitleCase(value) {
  if (!value) {
    return "";
  }

  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatRiskFlag(flag) {
  return toTitleCase((flag || "").replace(/_/g, " "));
}

function buildLocationLabel(weather) {
  if (!weather) {
    return "No forecast loaded";
  }

  return [weather.city, weather.state, weather.country].filter(Boolean).join(", ");
}

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
        const parsed = JSON.parse(saved);
        setWeather(parsed);
        setCity(parsed.city || "");
      } catch {
        localStorage.removeItem("latestWeather");
      }
    }
  }, []);

  async function handleFetchWeather(event) {
    event?.preventDefault();

    const nextCity = city.trim();

    if (!nextCity) {
      setError("Please enter a valid city name.");
      return;
    }

    try {
      setError("");
      setSuggestions(null);
      setLoadingWeather(true);

      const res = await fetch(`/api/weather?city=${encodeURIComponent(nextCity)}`);
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to fetch weather");
      }

      setWeather(data.weather);
      setCity(data.weather?.city || nextCity);
      localStorage.setItem("latestWeather", JSON.stringify(data.weather));
    } catch (err) {
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

  const locationLabel = buildLocationLabel(weather);
  const currentCondition = weather?.weather?.main || "Awaiting forecast";
  const currentDescription =
    toTitleCase(weather?.weather?.description) ||
    "Search for a city to view the latest conditions.";
  const riskLevel = weather?.insights?.risk_level || "low";
  const riskLabel = `${toTitleCase(riskLevel)} risk`;
  const summaryRiskLabel = weather ? riskLabel : "Awaiting data";
  const riskFlags = weather?.insights?.risk_flags || [];
  const metricCards = [
    {
      label: "Feels like",
      value: formatTemperature(weather?.weather?.feels_like_c, 1),
    },
    {
      label: "Humidity",
      value: formatHumidity(weather?.weather?.humidity),
    },
    {
      label: "Wind speed",
      value: formatWindSpeed(weather?.weather?.wind_speed),
    },
    {
      label: "Coordinates",
      value: formatCoordinates(weather?.coordinates),
    },
  ];

  return (
    <main className="weather-page">
      <div className="weather-page__backdrop" aria-hidden="true">
        <span className="weather-page__orb weather-page__orb--one" />
        <span className="weather-page__orb weather-page__orb--two" />
        <span className="weather-page__orb weather-page__orb--three" />
      </div>

      <div className="weather-page__content">
        <section className="hero-card">
          <div className="hero-copy">
            <p className="hero-kicker">Weather Insight Dashboard</p>
            <h1 className="hero-title">
              Professional weather guidance for travel, safety, and daily
              planning.
            </h1>
            <p className="hero-description">
              Search any city to review live conditions, identify local risk
              signals, and turn the forecast into practical next steps.
            </p>

            <div className="status-row">
              <span className="status-pill">
                {weather ? "Saved forecast ready" : "No forecast loaded"}
              </span>
              <span className="status-pill status-pill--ghost">
                Last update: {formatTimestamp(weather?.generated_at)}
              </span>
            </div>
          </div>

          <div className="search-panel">
            <form className="search-form" onSubmit={handleFetchWeather}>
              <label className="field-group" htmlFor="city-input">
                <span className="field-label">City</span>
                <input
                  id="city-input"
                  type="text"
                  placeholder="Try Toronto, Tokyo, or Nairobi"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="search-input"
                  autoComplete="off"
                />
              </label>

              <button
                type="submit"
                disabled={loadingWeather || !city.trim()}
                className="primary-button"
              >
                {loadingWeather ? "Refreshing forecast..." : "Fetch weather"}
              </button>
            </form>

            <div className="quick-summary">
              <div className="quick-summary__item">
                <span className="quick-summary__label">Current city</span>
                <strong>{weather?.city || "Waiting for a search"}</strong>
              </div>
              <div className="quick-summary__item">
                <span className="quick-summary__label">Condition</span>
                <strong>{currentCondition}</strong>
              </div>
            </div>
          </div>
        </section>

        {error ? (
          <div className="alert-banner" role="alert" aria-live="polite">
            {error}
          </div>
        ) : null}

        <section className="app-grid">
          <article className="card card--weather">
            <div className="card-header">
              <div>
                <p className="eyebrow">Current conditions</p>
                <h2 className="section-title">{locationLabel}</h2>
              </div>
              {weather ? (
                <span className={`risk-badge risk-badge--${riskLevel}`}>
                  {riskLabel}
                </span>
              ) : null}
            </div>

            {weather ? (
              <>
                <div className="temperature-layout">
                  <div>
                    <p className="temperature-readout">
                      {formatTemperature(weather.weather?.temperature_c)}
                    </p>
                    <p className="condition-main">{currentCondition}</p>
                    <p className="condition-copy">{currentDescription}</p>
                  </div>

                  <div className="insight-callout">
                    <span className="insight-callout__label">Planner note</span>
                    <p>
                      {weather.insights?.practical_recommendation ||
                        "Practical guidance will appear here after the weather loads."}
                    </p>
                  </div>
                </div>

                <div className="metric-grid">
                  {metricCards.map((card) => (
                    <div key={card.label} className="metric-card">
                      <span className="metric-card__label">{card.label}</span>
                      <strong className="metric-card__value">{card.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="tag-row">
                  {riskFlags.length > 0 ? (
                    riskFlags.map((flag) => (
                      <span key={flag} className="tag">
                        {formatRiskFlag(flag)}
                      </span>
                    ))
                  ) : (
                    <span className="tag">Stable conditions</span>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p className="empty-state__title">
                  Search for a city to load the forecast.
                </p>
                <p className="empty-state__copy">
                  The dashboard will show temperature, local conditions, and
                  risk indicators here.
                </p>
              </div>
            )}
          </article>

          <article className="card">
            <div className="card-header">
              <div>
                <p className="eyebrow">Decision support</p>
                <h2 className="section-title">AI suggestions</h2>
              </div>

              <button
                type="button"
                onClick={handleGetSuggestions}
                disabled={!weather || loadingSuggestions}
                className="primary-button primary-button--secondary primary-button--compact"
              >
                {loadingSuggestions
                  ? "Generating..."
                  : suggestions
                    ? "Refresh suggestions"
                    : "Generate suggestions"}
              </button>
            </div>

            <div className="summary-grid">
              <div className="summary-card">
                <span className="summary-card__label">Risk level</span>
                <strong className="summary-card__value">{summaryRiskLabel}</strong>
              </div>
              <div className="summary-card">
                <span className="summary-card__label">Active flags</span>
                <strong className="summary-card__value">
                  {weather ? riskFlags.length : 0}
                </strong>
              </div>
              <div className="summary-card">
                <span className="summary-card__label">Last synced</span>
                <strong className="summary-card__value">
                  {formatTimestamp(weather?.generated_at)}
                </strong>
              </div>
            </div>

            {suggestions ? (
              <div className="suggestion-grid">
                {suggestionSections.map((section) => (
                  <div key={section.key} className="suggestion-card">
                    <span className="suggestion-card__eyebrow">
                      {section.eyebrow}
                    </span>
                    <h3 className="suggestion-card__title">{section.title}</h3>
                    <p className="suggestion-card__copy">
                      {suggestions[section.key]}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state empty-state--subtle">
                <p className="empty-state__title">
                  {weather
                    ? "Create tailored suggestions for this forecast."
                    : "Suggestions unlock after the forecast is loaded."}
                </p>
                <p className="empty-state__copy">
                  {weather
                    ? "Generate travel, safety, and activity guidance based on the current weather summary."
                    : "Fetch weather first, then generate AI guidance for travel, risk, and daily activity planning."}
                </p>
              </div>
            )}

            <p className="card-note">
              Suggestions are generated from the weather summary currently stored
              in the app.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
