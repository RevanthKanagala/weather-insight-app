import { fetchWeatherByCity } from "@/lib/weather";
import { transformWeatherData } from "@/lib/transform";
import { saveLatestWeather } from "@/lib/storage";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get("city");

        if (!city || !city.trim()) {
            return Response.json(
                { ok: false, error: "City query parameter is required" },
                { status: 400 }
            );
        }

        const rawWeather = await fetchWeatherByCity(city);
        const transformed = transformWeatherData(rawWeather);
        saveLatestWeather(transformed);

        return Response.json({
            ok: true,
            weather: transformed
        });
    } catch (error) {
        return Response.json(
            { ok: false, error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}