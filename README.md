# Weather Insight App

A small end-to-end AI application that ingests weather data from OpenWeather API, transforms it into a simpler structured format, stores it in JSON, and uses an LLM layer to generate travel, risk, and activity suggestions through a web UI.

## Scope
- Travel suggestions based on weather
- Risk alerts for weather conditions
- Clothing or activity recommendations

## Out of scope
- User login and account management
- Flight or hotel booking
- General chatbot questions unrelated to weather

## Architecture

The app moves through a simple end-to-end flow:

`City input -> OpenWeather ingestion -> transform to cleaned JSON -> store latest weather -> generate OpenAI suggestions -> render UI`

Core files:

- `app/page.js`
- `app/api/weather/route.js`
- `app/api/suggest/route.js`
- `lib/weather.js`
- `lib/transform.js`
- `lib/storage.js`

## Local Verification

- Tests: `npm test -- --run`
- Build: `npm run build`
- Playwright evidence: `docs/workflow/playwright-test-notes.md`
- Presentation checklist: `docs/presentation/submission-checklist.md`
- Video outline: `docs/presentation/video-walkthrough-outline.md`

## Workflow Evidence

### Required skills workflow
This project followed the required workflow in this order:

1. `grill-me`
2. `write-a-prd`
3. `prd-to-issues`
4. `tdd`
5. `improve-codebase-architecture`

### Evidence
- Grill-me notes: `docs/workflow/grill-me-notes.md`
- Write-a-PRD notes: `docs/workflow/write-a-prd-notes.md`
- PRD document: `docs/workflow/prd.md`
- PRD-to-Issues breakdown: `docs/workflow/prd-to-issues.md`
- TDD notes: `docs/workflow/tdd-notes.md`
- Improve-codebase-architecture notes: `docs/workflow/improve-codebase-architecture-notes.md`
- Architecture review: `docs/workflow/architecture-before-after.md`
- Playwright testing notes: `docs/workflow/playwright-test-notes.md`

### PRD Summary
- Problem: raw weather API output is noisy and not directly useful for quick planning
- Solution: ingest live city weather, transform it into a clean summary, store it in JSON, and generate AI-guided travel, risk, and activity suggestions
- Supported tasks: weather summary, travel guidance, risk alerts, clothing or activity recommendations
- Out of scope: login, bookings, unrelated chatbot behavior, and overbuilt infrastructure

### GitHub Issues
- Parent PRD issue: `#1`
- Build weather ingestion, transformation, and storage flow: `#2`
- Build AI suggestion route and UI workflow: `#3`
- Add meaningful tests for supported weather app behaviors: `#4`
- Review and improve codebase architecture after first working version: `#5`

### PRD-to-Issues Summary
- The PRD was broken into thin vertical slices instead of layer-only tasks
- Each slice is independently demoable and tied to specific user stories
- The approved slice breakdown is documented in `docs/workflow/prd-to-issues.md`

## Playwright MCP Evidence

A meaningful end-to-end browser test was performed using Playwright MCP for this user flow:

1. Enter a city
2. Fetch weather
3. View weather summary
4. Request AI suggestions
5. Verify travel, risk, and activity outputs appear

See: `docs/workflow/playwright-test-notes.md`

## Evaluation Evidence

The Weather Insight App was evaluated using representative weather cases, failure cases, and a lightweight baseline comparison.

### Representative Cases

Five representative cases were created to test common user scenarios:

- Toronto: typical Canadian city weather request
- Vancouver: rain-prone city weather request
- Calgary: wind/cold-sensitive city weather request
- New York: large international city weather request
- Mumbai: hot/humid city weather request

These cases are stored in:

```text
evaluation/cases/representative_cases.json