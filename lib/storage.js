import fs from "fs";
import path from "path";

let memoryWeatherData = null;

function getWeatherFilePath() {
    return process.env.WEATHER_STORAGE_PATH || path.join(process.cwd(), "data", "weather-latest.json");
}

function isMemoryStorageEnabled() {
    return process.env.WEATHER_STORAGE_MODE === "memory";
}

export function saveLatestWeather(data) {
    if (isMemoryStorageEnabled()) {
        memoryWeatherData = JSON.parse(JSON.stringify(data));
        return;
    }

    const filePath = getWeatherFilePath();

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getLatestWeather() {
    if (isMemoryStorageEnabled()) {
        return memoryWeatherData;
    }

    const filePath = getWeatherFilePath();

    try {
        const file = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(file);
    } catch (error) {
        return null;
    }
}
