export async function fetchWeatherByCity(city) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        throw new Error("OPENWEATHER_API_KEY is missing");
    }

    if (!city || !city.trim()) {
        throw new Error("City is required");
    }

    const cleanCity = city.trim();

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cleanCity)}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);

    if (!geoRes.ok) {
        const errorText = await geoRes.text();
        throw new Error(`Failed to fetch city coordinates: ${geoRes.status} ${errorText}`);
    }

    const geoData = await geoRes.json();

    if (!Array.isArray(geoData) || geoData.length === 0) {
        throw new Error("City not found");
    }

    const { lat, lon, name, country, state } = geoData[0];

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherRes = await fetch(weatherUrl);

    if (!weatherRes.ok) {
        const errorText = await weatherRes.text();
        throw new Error(`Failed to fetch weather data: ${weatherRes.status} ${errorText}`);
    }

    const weatherData = await weatherRes.json();

    return {
        location: {
            city: name,
            country: country || "",
            state: state || "",
            lat,
            lon
        },
        raw: weatherData
    };
}