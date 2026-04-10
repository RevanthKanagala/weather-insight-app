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
- Screenshot or recording from Playwright MCP
- Confirmation that the app completed the end-to-end flow
- Notes added to the repo for assignment evidence

## Outcome
The app successfully supported the intended end-to-end weather workflow through the user-facing interface.