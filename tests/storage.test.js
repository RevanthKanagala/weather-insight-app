import { describe, it, expect, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { saveLatestWeather, getLatestWeather } from "../lib/storage";

const filePath = path.join(process.cwd(), "data", "weather-latest.json");

describe("storage", () => {
    beforeEach(() => {
        fs.writeFileSync(filePath, "{}", "utf-8");
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