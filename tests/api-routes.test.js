import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const originalOpenAiKey = process.env.OPENAI_API_KEY;
const originalWeatherStorageMode = process.env.WEATHER_STORAGE_MODE;
const originalOpenWeatherKey = process.env.OPENWEATHER_API_KEY;

describe("API routes", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        process.env.OPENAI_API_KEY = "test-key";
        process.env.OPENWEATHER_API_KEY = "test-weather-key";
        process.env.WEATHER_STORAGE_MODE = "memory";
    });

    afterEach(() => {
        if (typeof originalOpenAiKey === "string") {
            process.env.OPENAI_API_KEY = originalOpenAiKey;
        } else {
            delete process.env.OPENAI_API_KEY;
        }

        if (typeof originalOpenWeatherKey === "string") {
            process.env.OPENWEATHER_API_KEY = originalOpenWeatherKey;
        } else {
            delete process.env.OPENWEATHER_API_KEY;
        }

        if (typeof originalWeatherStorageMode === "string") {
            process.env.WEATHER_STORAGE_MODE = originalWeatherStorageMode;
        } else {
            delete process.env.WEATHER_STORAGE_MODE;
        }
    });

    it("/api/weather rejects an empty city", async () => {
        const { GET } = await import("../app/api/weather/route");

        const response = await GET(new Request("http://localhost/api/weather?city="));
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body).toEqual({
            ok: false,
            error: "Please enter a valid city name.",
        });
    });

    it("/api/weather returns a cleaned weather summary for a valid city", async () => {
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [
                    {
                        lat: 43.65,
                        lon: -79.38,
                        name: "Toronto",
                        country: "CA",
                        state: "Ontario",
                    },
                ],
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    weather: [
                        {
                            main: "Clouds",
                            description: "broken clouds",
                        },
                    ],
                    main: {
                        temp: 14.33,
                        feels_like: 13.41,
                        humidity: 61,
                    },
                    wind: {
                        speed: 3.27,
                    },
                }),
            });

        vi.stubGlobal("fetch", fetchMock);

        const { GET } = await import("../app/api/weather/route");
        const { getLatestWeather } = await import("../lib/storage");

        const response = await GET(new Request("http://localhost/api/weather?city=Toronto"));
        const body = await response.json();
        const storedWeather = getLatestWeather();

        expect(response.status).toBe(200);
        expect(body.ok).toBe(true);
        expect(body.weather.city).toBe("Toronto");
        expect(body.weather.country).toBe("CA");
        expect(body.weather.weather.main).toBe("Clouds");
        expect(body.weather.weather.temperature_c).toBe(14.33);
        expect(storedWeather.city).toBe("Toronto");
        expect(storedWeather.weather.main).toBe("Clouds");
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("/api/suggest rejects requests when no stored weather data exists", async () => {
        vi.doMock("openai", () => ({
            default: class OpenAI {
                constructor() {
                    this.chat = {
                        completions: {
                            create: vi.fn(),
                        },
                    };
                }
            },
        }));

        const { GET } = await import("../app/api/suggest/route");

        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(404);
        expect(body).toEqual({
            ok: false,
            error: "No stored weather data found. Fetch weather first.",
        });
    });
});
