GitHub Parent Issue: #1

# PRD — Weather Insight App

## Product name
Weather Insight App

## One-line purpose
A small end-to-end AI application that fetches weather data for a city, transforms it into a simplified structured format, stores it in JSON, and generates practical weather-based suggestions for the user.

## Problem
Raw weather API responses are noisy and not directly helpful for many users. Users often want simple answers such as:
- Is this weather good for travel?
- Are there any weather-related risks?
- What should I wear or what activity makes sense?

## Target user
A general user who wants quick weather-based suggestions for a city without reading raw weather data.

## Supported use cases
1. Get weather-based travel suggestions for a city
2. View risk alerts for conditions like rain, wind, heat, or storms
3. Get clothing or activity recommendations based on current weather

## Out of scope
1. User login and account management
2. Flight or hotel booking
3. General chatbot questions unrelated to weather
4. Long-range planning or advanced forecasting analytics
5. Multi-city comparison dashboards

## End-to-end workflow
1. User enters a city in the UI
2. The app fetches raw weather data from OpenWeather
3. The app transforms raw API data into a simpler structured schema
4. The app stores the cleaned weather summary in JSON
5. The app sends the cleaned summary to the LLM layer
6. The app returns travel, risk, and activity suggestions to the UI

## Architecture direction
- Frontend/UI: Next.js page
- Ingestion: OpenWeather API
- ETL/transformation: `lib/transform.js`
- Storage: `data/weather-latest.json`
- Reasoning layer: OpenAI API in `app/api/suggest/route.js`
- API routes: `app/api/weather/route.js`, `app/api/suggest/route.js`

## Data flow
Raw weather API -> transformed weather summary -> stored JSON -> LLM-generated suggestions -> UI display

## Why this scope is appropriate
This project is small enough to complete, narrow enough to be reliable, and complete enough to demonstrate ingestion, ETL, storage, reasoning, and UI in one working flow.

## Success criteria
- User can enter a city and fetch weather
- App stores transformed weather data in JSON
- User can request AI suggestions
- App returns travel, risk, and activity guidance
- Tests cover meaningful logic
- App is deployed on Vercel

## Notes for workflow
This PRD was created after pressure-testing the idea and reducing scope to keep the project focused and reliable.