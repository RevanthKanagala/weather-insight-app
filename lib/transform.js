function buildWeatherInsights(weather) {
    const condition = (weather.main || "").toLowerCase();
    const description = (weather.description || "").toLowerCase();
    const temperature = weather.temperature_c;
    const feelsLike = weather.feels_like_c;
    const humidity = weather.humidity;
    const windSpeed = weather.wind_speed;

    const riskFlags = [];
    const recommendations = [];

    if (condition.includes("rain") || description.includes("rain") || description.includes("drizzle")) {
        riskFlags.push("rain");
        recommendations.push("Carry an umbrella and be careful on slippery roads.");
    }

    if (condition.includes("snow") || description.includes("snow")) {
        riskFlags.push("snow");
        recommendations.push("Wear warm layers and allow extra travel time because roads may be slippery.");
    }

    if (typeof temperature === "number" && temperature <= 0) {
        riskFlags.push("freezing_temperature");
        recommendations.push("Wear insulated clothing, gloves, and avoid staying outside for too long.");
    } else if (typeof temperature === "number" && temperature <= 8) {
        riskFlags.push("cold_temperature");
        recommendations.push("Wear a jacket or layered clothing before going outside.");
    }

    if (typeof feelsLike === "number" && feelsLike >= 30) {
        riskFlags.push("high_heat");
        recommendations.push("Drink water regularly and avoid heavy outdoor activity during peak afternoon hours.");
    }

    if (typeof humidity === "number" && humidity >= 80) {
        riskFlags.push("high_humidity");
        recommendations.push("Expect humid conditions and choose lighter clothing if going outside.");
    }

    if (typeof windSpeed === "number" && windSpeed >= 10) {
        riskFlags.push("strong_wind");
        recommendations.push("Be cautious when biking, walking in open areas, or carrying loose items.");
    }

    if (riskFlags.length === 0) {
        recommendations.push("Weather conditions look manageable. Normal outdoor activity should be fine.");
    }

    let riskLevel = "low";

    if (
        riskFlags.includes("freezing_temperature") ||
        riskFlags.includes("high_heat") ||
        riskFlags.includes("snow") ||
        riskFlags.includes("strong_wind")
    ) {
        riskLevel = "high";
    } else if (riskFlags.length > 0) {
        riskLevel = "medium";
    }

    return {
        risk_level: riskLevel,
        risk_flags: riskFlags,
        practical_recommendation: recommendations.join(" ")
    };
}

export function transformWeatherData(input) {
    if (!input || !input.location || !input.raw) {
        throw new Error("Invalid weather input");
    }

    const { location, raw } = input;

    const weather = {
        main: raw.weather?.[0]?.main || "",
        description: raw.weather?.[0]?.description || "",
        temperature_c: raw.main?.temp ?? null,
        feels_like_c: raw.main?.feels_like ?? null,
        humidity: raw.main?.humidity ?? null,
        wind_speed: raw.wind?.speed ?? null
    };

    return {
        city: location.city || "",
        country: location.country || "",
        state: location.state || "",
        coordinates: {
            lat: location.lat ?? null,
            lon: location.lon ?? null
        },
        weather,
        insights: buildWeatherInsights(weather),
        generated_at: new Date().toISOString()
    };
}