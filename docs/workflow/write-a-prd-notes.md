# write-a-prd Notes

## Why this skill was used

The app was already implemented, but the assignment requires evidence that product planning happened through the required workflow. This note captures how `write-a-prd` was used to turn the existing app into a clear product definition that matches the real codebase.

## User input used for the PRD

The product was described as:

- a small end-to-end AI web application
- intended for general users who want practical weather guidance for a city
- powered by OpenWeather ingestion, transformation, JSON storage, an LLM reasoning layer, and a simple UI
- focused on travel suggestions, risk alerts, and clothing or activity recommendations

## Codebase findings used to verify the PRD

- The UI collects a city and drives the main flow.
- The weather route performs ingestion, transformation, and storage.
- The suggestion route reads stored structured data and calls the LLM layer.
- The transformation and storage logic are already separated into testable helper modules.

## Module decisions

- Keep ingestion isolated from transformation so the raw external dependency does not leak across the app.
- Keep transformation logic in a small deep module because it is stable, easy to test, and central to the product.
- Keep storage simple with JSON persistence because the assignment values a focused proof of concept over infrastructure complexity.
- Keep the UI as a single simple flow rather than expanding to dashboards or unrelated features.

## Testing decisions captured during PRD writing

- Test transformation behavior with realistic sample API input.
- Test storage behavior by saving and reloading structured weather summaries.
- Use Playwright MCP for the real user journey of entering a city, fetching weather, and requesting AI suggestions.

## What changed because of this skill

- The product scope is now documented in assignment language instead of only being implied by the code.
- The supported tasks, architectural layers, testing choices, and out-of-scope boundaries are now explicit.
- The repo now contains a PRD that can be referenced in the video walkthrough and linked to a parent GitHub Issue.
