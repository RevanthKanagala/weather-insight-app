import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "weather-latest.json");

export function saveLatestWeather(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getLatestWeather() {
    try {
        const file = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(file);
    } catch (error) {
        return null;
    }
}