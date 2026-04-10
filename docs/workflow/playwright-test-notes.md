# Playwright MCP Testing Notes

## Purpose
Use Playwright MCP to test a meaningful end-to-end user flow for the Weather Insight App.

## Scenario tested
1. Open the app
2. Enter the city `Toronto`
3. Click `Fetch Weather`
4. Verify that weather summary appears
5. Click `Get AI Suggestions`
6. Verify that AI suggestions appear:
   - Travel Suggestion
   - Risk Alert
   - Activity Recommendation

## Why this test is meaningful
This is not just a page-load check. It exercises the real user workflow across:
- UI input
- backend API route for weather ingestion
- ETL/transformation
- storage of structured weather data
- reasoning layer
- final UI rendering

## Evidence collected
- Playwright MCP interactive browser session against the local app
- Full-flow UI state captured during the Playwright MCP session after suggestions rendered
- Confirmation that the app completed the full end-to-end flow from city input to AI suggestions
- Notes added to the repo for assignment evidence

## Outcome
Verified on 2026-04-09 against the local built app:

- entered `Toronto`
- fetched live weather successfully
- rendered structured weather summary
- generated and displayed AI travel, risk, and activity suggestions

The app successfully supported the intended end-to-end weather workflow through the user-facing interface.
