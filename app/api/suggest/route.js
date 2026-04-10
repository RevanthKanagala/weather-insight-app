import OpenAI from "openai";

function extractJson(text) {
  if (!text) return null;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

export async function GET() {
  return Response.json(
    {
      ok: false,
      error: "Use POST /api/suggest with weather data in the request body.",
    },
    { status: 405 }
  );
}

export async function POST(request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { ok: false, error: "OPENAI_API_KEY is missing" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const latestWeather = body?.weather;

    if (!latestWeather || !latestWeather.city) {
      return Response.json(
        { ok: false, error: "No weather data provided. Fetch weather first." },
        { status: 400 }
      );
    }

    const client = new OpenAI({ apiKey });

    const prompt = `
You are a weather insight assistant.

Use the weather summary below to generate:
1. A short travel suggestion
2. A short risk alert
3. A short clothing or activity recommendation

Keep the response practical, simple, and based only on the weather data.

Weather summary:
${JSON.stringify(latestWeather, null, 2)}

Return only valid JSON.
Do not use markdown fences.
Do not add extra explanation.

Use exactly this format:
{
  "travel_suggestion": "...",
  "risk_alert": "...",
  "activity_recommendation": "..."
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.4,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices?.[0]?.message?.content || "";
    const parsed = extractJson(text);

    if (!parsed) {
      return Response.json(
        {
          ok: false,
          error: "Model did not return valid JSON",
          raw_output: text,
        },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      suggestions: parsed,
      weather: latestWeather,
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
