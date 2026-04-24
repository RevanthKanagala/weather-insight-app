import { fetchWeatherByCity } from "@/lib/weather";
import { transformWeatherData } from "@/lib/transform";
import { saveLatestWeather } from "@/lib/storage";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    if (!city || !city.trim()) {
      return Response.json(
        { ok: false, error: "Please enter a valid city name." },
        { status: 400 }
      );
    }

    const rawWeather = await fetchWeatherByCity(city);
    const transformed = transformWeatherData(rawWeather);

    try {
      saveLatestWeather(transformed);
    } catch (storageError) {
      console.warn("Weather storage skipped:", storageError.message);
    }

    return Response.json({
      ok: true,
      weather: transformed,
    });
  } catch (error) {
    const message =
      error.message === "City not found"
        ? "City not found. Please enter a valid city name."
        : error.message || "Something went wrong";

    return Response.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}