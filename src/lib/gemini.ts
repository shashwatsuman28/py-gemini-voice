// Gemini API integration
const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;

export async function geminiChat(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API Key");
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Gemini API error: " + res.statusText);
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
}
