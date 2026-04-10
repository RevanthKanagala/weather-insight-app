import { fetchWeatherByCity } from "@/lib/weather";
import { transformWeatherData } from "@/lib/transform";

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

    return Response.json({
      ok: true,
      weather: transformed,
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
