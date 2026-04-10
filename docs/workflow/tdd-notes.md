# tdd Notes

## Goal

Use test-driven development on meaningful public behaviors in the Weather Insight App rather than adding superficial tests.

## Agreed behavior scope

1. `/api/weather` rejects an empty city
2. `/api/weather` returns a cleaned weather summary for a valid city
3. `/api/suggest` rejects requests when no stored weather data exists

## TDD approach

- Focus on public route behavior rather than private helper implementation.
- Exercise the real route handlers directly.
- Mock only the external weather source where needed.
- Keep the transformation and storage path real in the valid weather flow so the test verifies an actual end-to-end slice.

## Why these tests matter

- They cover supported user-facing behavior rather than random utilities.
- They verify the app's real workflow at the API boundary.
- They strengthen the assignment evidence for meaningful tests tied to the product claims.
