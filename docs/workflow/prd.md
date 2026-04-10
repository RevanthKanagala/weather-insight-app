GitHub Parent Issue: #1

# PRD - Weather Insight App

## Problem Statement

Users who check weather before going out, commuting, or planning short travel often get raw API data or generic forecast screens that are noisy and hard to act on quickly. They do not want to interpret technical fields themselves. They want practical guidance for a specific city, such as whether the weather looks good for travel, whether there are important risks, and what kind of clothing or activity makes sense.

## Solution

Weather Insight App provides a small end-to-end AI experience for city-level weather guidance. A user enters a city, the system ingests live weather data from OpenWeather, transforms the raw response into a simpler structured weather summary, stores that cleaned data as JSON, and then uses an LLM layer to generate practical suggestions. The app focuses on a narrow set of useful outputs: travel guidance, weather risk alerts, and clothing or activity recommendations.

## User Stories

1. As a general user, I want to enter a city name, so that I can get weather guidance for a place I care about.
2. As a general user, I want the app to fetch live weather data for that city, so that I am not relying on stale hardcoded information.
3. As a general user, I want the weather response simplified into readable fields, so that I do not need to understand the raw API payload.
4. As a general user, I want to see a weather summary before asking for AI advice, so that I can verify the app is using the right city and conditions.
5. As a general user, I want a travel suggestion based on the weather, so that I can quickly judge whether conditions are suitable for going out or making a short trip.
6. As a general user, I want a risk alert for conditions like rain, wind, or uncomfortable temperatures, so that I can avoid obvious weather-related problems.
7. As a general user, I want a clothing or activity recommendation, so that I can act on the forecast without extra interpretation.
8. As a general user, I want the AI output to be grounded in the cleaned structured weather data, so that the suggestions stay relevant to the actual conditions.
9. As a user testing the app, I want errors for missing cities or missing data to be understandable, so that the workflow is still usable when something goes wrong.
10. As a developer, I want the ingestion, transformation, storage, and reasoning concerns separated, so that the end-to-end system is easier to explain and test.
11. As a developer, I want the cleaned weather summary stored in JSON, so that the app has a visible persistence layer that fits the assignment scope.
12. As a reviewer, I want to inspect a clear path from source ingestion to UI output, so that the app demonstrates a real end-to-end workflow instead of a single prompt.
13. As a reviewer, I want the project scope to stay intentionally small, so that the product remains reliable and explainable as a proof of concept.

## Implementation Decisions

- The product scope stays centered on one city at a time and three supported tasks: travel suggestions, risk alerts, and clothing or activity recommendations.
- The source ingestion layer uses OpenWeather data so the app can demonstrate a real external data source.
- The transformation layer normalizes the raw response into a smaller schema with location, weather condition, temperature, humidity, and wind details.
- The storage layer uses a JSON file as the source of truth for the latest cleaned weather payload, which keeps the proof of concept simple and easy to inspect.
- The reasoning layer uses a weather-grounded prompt over the stored structured weather summary rather than prompting directly from the raw API response.
- The user experience is intentionally linear: enter city, fetch weather, inspect summary, request AI suggestions.
- The system architecture is intentionally layered into ingestion, transformation, storage, reasoning, and UI so the assignment requirements are visible in both the code and the explanation.
- The product avoids unnecessary infrastructure such as authentication, bookings, multi-tenant features, or unrelated chatbot behavior.
- The main modules to build or maintain are a weather ingestion module, a transformation module, a storage module, weather and suggestion API handlers, and a single-page UI flow.
- The deeper modules are the transformation and storage layers because they encapsulate behavior behind small interfaces that are easy to test in isolation.

## Testing Decisions

- Good tests should verify external behavior and supported outcomes, not internal implementation details.
- The transformation layer should be tested because it is responsible for turning noisy source data into the schema used everywhere else.
- The storage layer should be tested because the app depends on reading and writing the cleaned weather summary reliably.
- The end-to-end browser flow should be tested because the assignment expects meaningful user-experience evidence, not just unit tests.
- Tests should match claimed product behavior, including weather transformation, persistence, and the UI flow of fetching weather and requesting AI suggestions.
- Existing test patterns in the codebase already cover behavior-focused checks for transformation and storage, and those remain the right model for future additions.

## Out of Scope

- User login and account management
- Hotel or flight booking
- Multi-city comparison workflows
- Long-range forecasting beyond the current near-term weather lookup flow
- General chatbot functionality unrelated to the structured weather workflow
- Production-scale infrastructure such as complex databases, vector stores, or scheduling systems that are not needed for this proof of concept

## Further Notes

- This PRD was written after pressure-testing the project scope with the `grill-me` workflow.
- The current implementation already matches the core architecture direction described here, so this PRD serves both as assignment evidence and as a clean product description of the existing app.
- The next workflow step after this PRD is to convert the work into smaller GitHub Issues for vertical slices such as ingestion/storage, AI suggestion flow, testing, and architecture improvement.
