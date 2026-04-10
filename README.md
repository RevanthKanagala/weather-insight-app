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
- PRD document: `docs/workflow/prd.md`
- Architecture review: `docs/workflow/architecture-before-after.md`
- Playwright testing notes: `docs/workflow/playwright-test-notes.md`

### GitHub Issues
- Parent PRD issue: `#1`
- Build weather ingestion, transformation, and storage flow: `#2`
- Build AI suggestion route and UI workflow: `#3`
- Add meaningful tests for supported weather app behaviors: `#4`
- Review and improve codebase architecture after first working version: `#5`

## Playwright MCP Evidence

A meaningful end-to-end browser test was performed using Playwright MCP for this user flow:

1. Enter a city
2. Fetch weather
3. View weather summary
4. Request AI suggestions
5. Verify travel, risk, and activity outputs appear

See: `docs/workflow/playwright-test-notes.md`