import { describe, it, expect } from "vitest";
import { transformWeatherData } from "../lib/transform";

describe("transformWeatherData", () => {
    it("transforms raw weather input into simplified structure", () => {
        const input = {
            location: {
                city: "Toronto",
                country: "CA",
                state: "Ontario",
                lat: 43.65,
                lon: -79.38,
            },
            raw: {
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
            },
        };

        const result = transformWeatherData(input);

        expect(result.city).toBe("Toronto");
        expect(result.country).toBe("CA");
        expect(result.state).toBe("Ontario");
        expect(result.coordinates.lat).toBe(43.65);
        expect(result.coordinates.lon).toBe(-79.38);
        expect(result.weather.main).toBe("Clouds");
        expect(result.weather.description).toBe("broken clouds");
        expect(result.weather.temperature_c).toBe(14.33);
        expect(result.weather.feels_like_c).toBe(13.41);
        expect(result.weather.humidity).toBe(61);
        expect(result.weather.wind_speed).toBe(3.27);
        expect(result.generated_at).toBeTruthy();
    });

    it("throws on invalid input", () => {
        expect(() => transformWeatherData(null)).toThrow("Invalid weather input");
    });
});