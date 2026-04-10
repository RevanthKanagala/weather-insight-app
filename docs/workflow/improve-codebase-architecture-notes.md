# improve-codebase-architecture Notes

## Chosen candidate

Deepen the weather workflow module so the app has one clear boundary for:

- city lookup input
- weather ingestion
- transformation
- persistence
- final app-ready response

## Why this area was chosen

The current weather flow works, but the orchestration is split across the route handler and several small helper modules. The route currently knows too much about the workflow:

- validate city input
- call the ingestion layer
- transform raw data
- persist cleaned data
- shape the HTTP response

This makes the core product workflow harder to explain, harder to test at one boundary, and more coupled to the route than it needs to be.

## Constraints for a better interface

Any improved interface should:

- keep the public entry point small
- preserve the existing app behavior
- continue to use OpenWeather as the source
- continue to store cleaned weather data through the storage layer
- return a UI-ready weather summary
- keep HTTP-specific response shaping outside the deep module

## Dependency sketch

The deepened module would sit between the route and the current helpers:

`route -> weather workflow module -> ingestion + transform + storage`

That keeps the route thin while hiding the orchestration details behind one app-level use case.

## Interface options explored

### Option A - Minimal use-case function

Interface:

`getWeatherInsightForCity(city)`

Usage:

The route validates that a city string exists, calls one function, and returns the result.

What it hides:

- ingestion sequencing
- transform call
- persistence call
- workflow-level failures

Trade-offs:

- simplest interface
- easiest to explain and test
- less flexible if the app later needs partial workflow reuse

### Option B - Flexible workflow service

Interface:

`createWeatherWorkflow({ weatherClient, transformer, storage })`

Methods:

- `fetchAndStoreCityWeather(city)`
- `fetchRawCityWeather(city)`
- `transformAndStoreWeather(rawWeather)`

Usage:

The route uses the service and calls the main workflow method, while tests can swap dependencies explicitly.

What it hides:

- coordination across dependencies
- optional alternative implementations
- future extension points

Trade-offs:

- more flexible
- more dependency-friendly for tests
- larger interface than this proof of concept really needs

### Option C - Caller-optimized app facade

Interface:

`prepareWeatherForSuggestion(city)`

Usage:

The route calls a single app-level function that returns the stored cleaned weather summary in the same shape the UI expects.

What it hides:

- full workflow orchestration
- app-oriented defaults
- persistence assumptions

Trade-offs:

- makes the most common path extremely simple
- very aligned to the current product
- narrower and more opinionated than a reusable workflow service

## Recommendation

Option A is the strongest choice for this codebase.

Why:

- it creates a deeper module with the smallest stable interface
- it matches the assignment's emphasis on a clear end-to-end flow
- it reduces route complexity without introducing framework or dependency overhead
- it supports better behavior tests at the workflow boundary

## Proposed refactor direction

Introduce a weather workflow module responsible for the full city-to-structured-weather path. The API route should become mostly:

1. read input
2. validate required HTTP parameters
3. call the workflow module
4. map success or failure to an HTTP response

## Before and after summary

Before:

- route owns orchestration
- workflow knowledge is split across multiple files
- tests tend to target seams instead of one use-case boundary

After:

- route becomes a thin transport layer
- workflow behavior is centralized behind one deeper interface
- tests can focus on one public workflow boundary

## Assignment evidence value

This improvement is meaningful because it improves clarity and testability without adding unnecessary infrastructure. It is a structural refinement that makes the app easier to defend in the video and easier to evolve safely.
