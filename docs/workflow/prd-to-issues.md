# prd-to-issues Notes

Parent PRD Issue: #1

## Goal

Use the approved PRD to break the Weather Insight App into thin, end-to-end vertical slices that are independently understandable, demoable, and aligned with the assignment workflow.

## Approved vertical slices

### Issue #2 - Build weather ingestion, transformation, and storage flow

- Type: AFK
- Blocked by: None - can start immediately
- User stories addressed: 1, 2, 3, 4, 8, 10, 11, 12

## What to build

Implement the narrow end-to-end flow where a user enters a city, the app fetches live weather data, transforms the raw response into a readable summary, stores the cleaned result, and displays that summary in the UI.

## Acceptance criteria

- [ ] A user can enter a city and request weather data
- [ ] The app fetches real weather data from OpenWeather for that city
- [ ] The transformed weather payload is saved in a predictable JSON structure
- [ ] The UI shows a cleaned weather summary instead of a raw API response

### Issue #3 - Generate AI weather guidance in the UI

- Type: AFK
- Blocked by: #2
- User stories addressed: 5, 6, 7, 8

## What to build

Add the end-to-end AI guidance flow so a user can request weather-based travel, risk, and clothing or activity suggestions grounded in the stored structured weather data.

## Acceptance criteria

- [ ] A user can request AI suggestions after weather data is available
- [ ] The app returns travel guidance, a risk alert, and an activity or clothing recommendation
- [ ] The UI renders the generated suggestions clearly

### Issue #4 - Add behavior and end-to-end tests

- Type: AFK
- Blocked by: #2, #3
- User stories addressed: 4, 8, 9

## What to build

Add meaningful automated tests for the supported behaviors in the app, including core logic and the real user flow.

## Acceptance criteria

- [ ] Transformation behavior is covered by tests using realistic weather input
- [ ] Storage behavior is covered by tests using saved structured weather summaries
- [ ] At least one meaningful Playwright MCP flow covers the real user journey

### Issue #5 - Review and improve codebase architecture

- Type: HITL
- Blocked by: #2, #3, #4
- User stories addressed: 10, 11, 12, 13

## What to build

Review the working version of the app and make a documented architecture improvement that clarifies responsibilities and keeps the proof of concept simple and explainable.

## Acceptance criteria

- [ ] The app has a documented before/after architecture note
- [ ] The codebase structure more clearly reflects ingestion, transformation, storage, reasoning, and UI layers
- [ ] The improvement is meaningful without introducing unnecessary infrastructure

## Notes

- These slices were approved after reviewing the PRD and existing repo structure.
- The focus is on thin vertical slices rather than horizontal layer-only tasks.
- Existing issue numbers in the repo README were preserved for the architecture-review slice.
- GitHub CLI was not available in this terminal, so this file serves as the local artifact showing the `prd-to-issues` workflow and approved breakdown.
