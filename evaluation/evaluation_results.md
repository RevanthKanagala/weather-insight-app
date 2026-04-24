# Evaluation Results

## Evaluation Setup

The Weather Insight App was evaluated using three types of evaluation evidence:

1. Five representative weather test cases
2. Two failure test cases
3. A lightweight baseline comparison

The purpose of this evaluation was to check whether the app can handle normal user requests, failure situations, and provide more value than a basic weather response.

## Representative Test Cases

The representative test cases include different city and weather contexts:

| ID | City | Scenario | Expected Behavior |
|---|---|---|---|
| rep-001 | Toronto | Typical Canadian city weather request | App should return a valid weather summary and practical suggestion. |
| rep-002 | Vancouver | Rain-prone city weather request | App should return weather summary and mention rain-related precautions if rain is present. |
| rep-003 | Calgary | Wind/cold-sensitive city weather request | App should return weather summary and give clothing/activity advice based on cold or wind. |
| rep-004 | New York | Large international city weather request | App should handle a non-Canadian major city correctly. |
| rep-005 | Mumbai | Hot/humid city weather request | App should return weather summary and provide heat or humidity-related recommendation when relevant. |

## Failure Test Cases

The failure test cases check whether the app handles bad input safely:

| ID | Input | Scenario | Expected Behavior |
|---|---|---|---|
| fail-001 | XyzInvalidCity | Invalid city name entered by the user | App should not crash and should show a clear city-not-found message. |
| fail-002 | Empty input | User submits an empty city field | App should not call the weather API and should ask for a valid city name. |

## Baseline Comparison Summary

The baseline system only returns basic weather details such as temperature, condition, humidity, and wind speed.

The improved Weather Insight App adds more user value by including:

- Practical recommendations
- Risk-aware advice
- Better error handling
- Clearer user-facing messages

## Result Summary

| Evaluation Area | Result |
|---|---|
| Representative cases | Covered 5 realistic weather request scenarios |
| Failure cases | Covered invalid city and empty city input |
| Baseline comparison | Improved app provides more useful guidance than basic weather output |
| Evidence of improvement | Recommendations and error messages are more specific and practical |

## Conclusion

The evaluation shows that the Weather Insight App is more useful than a simple baseline weather response. The app does not only show weather data; it also gives practical suggestions that help users make decisions. The failure cases also show that the app is expected to handle invalid or empty input without crashing.