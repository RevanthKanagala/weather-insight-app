export function transformWeatherData(input) {
    if (!input || !input.location || !input.raw) {
        throw new Error("Invalid weather input");
    }

    const { location, raw } = input;

    return {
        city: location.city || "",
        country: location.country || "",
        state: location.state || "",
        coordinates: {
            lat: location.lat ?? null,
            lon: location.lon ?? null
        },
        weather: {
            main: raw.weather?.[0]?.main || "",
            description: raw.weather?.[0]?.description || "",
            temperature_c: raw.main?.temp ?? null,
            feels_like_c: raw.main?.feels_like ?? null,
            humidity: raw.main?.humidity ?? null,
            wind_speed: raw.wind?.speed ?? null
        },
        generated_at: new Date().toISOString()
    };
}