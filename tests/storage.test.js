import { beforeEach, describe, expect, it } from "vitest";
import { getLatestWeather, saveLatestWeather } from "../lib/storage";

process.env.WEATHER_STORAGE_MODE = "memory";

describe("storage", () => {
    beforeEach(() => {
        saveLatestWeather({});
    });

    it("saves and reads weather data", () => {
        const sample = {
            city: "Toronto",
            country: "CA",
            weather: {
                main: "Clouds",
            },
        };

        saveLatestWeather(sample);
        const result = getLatestWeather();

        expect(result.city).toBe("Toronto");
        expect(result.country).toBe("CA");
        expect(result.weather.main).toBe("Clouds");
    });

    it("returns an object after reset file", () => {
        const result = getLatestWeather();
        expect(result).toBeTypeOf("object");
    });
});
