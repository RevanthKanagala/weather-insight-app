# grill-me Notes

## Initial idea
Build a Weather Insight App that fetches OpenWeather data and uses an LLM to generate travel, risk, and activity suggestions.

## Questions raised during grilling
1. Is the scope narrow enough to finish reliably?
2. Does the project show a real end-to-end workflow, not just a single prompt?
3. Is there a clear ETL/transformation step?
4. Is there meaningful storage, or only temporary in-memory data?
5. What is explicitly out of scope so the project does not become too large?

## What changed because of grilling
- Removed user login from the scope
- Removed flight and hotel booking from the scope
- Kept the app focused on 3 supported tasks only:
  - travel suggestions
  - risk alerts
  - clothing/activity recommendations
- Added a visible transformation layer in `lib/transform.js`
- Added persistent JSON storage in `data/weather-latest.json`
- Kept architecture simple instead of adding unnecessary infra

## Final project direction
A small end-to-end AI app that ingests weather data, transforms it into a simpler structure, stores it in JSON, and uses an LLM to generate a few focused suggestions through a web UI.