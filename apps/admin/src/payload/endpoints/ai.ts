import { Endpoint } from "payload";

/**
 * Handles generating Tailwind classes from a text prompt via Azure AI Foundry.
 */
export const aiGenerateTailwindEndpoint: Endpoint = {
  path: "/ai/generate-tailwind",
  method: "post",
  handler: async (req) => {
    try {
      // payload 3.x uses fetch standard request / response formats on custom endpoints
      const body = typeof req.json === 'function' ? await req.json() : req.body;
      const prompt = body?.prompt;

      if (!prompt) {
        return Response.json({ error: "No prompt provided" }, { status: 400 });
      }

      // Check for Azure tokens
      const endpoint = process.env.AZURE_AI_ENDPOINT;
      const key = process.env.AZURE_AI_KEY;

      if (!endpoint || !key) {
        console.warn("Azure AI Foundry credentials missing. Returning mocked classes for now.");
        return Response.json({
          classes: "bg-blue-500 text-white p-4 rounded-lg shadow-md",
        });
      }

      // Payload specific prompt configuration
      const systemMessage = `
You are a Tailwind CSS assistant. Your only goal is to output a single string of Tailwind v4 utility classes based on the user's description.
Do NOT output any markdown, explanations, HTML, or other text. Only the space-separated CSS classes.
Example: 'bg-red-500 text-white rounded-md'
      `;

      // Depending on the Azure AI model (e.g., Azure OpenAI GPT-4 or similar)
      const aiResponse = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": key,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: prompt },
          ],
          temperature: 0.1, // Low temp for deterministic CSS
          max_tokens: 100,
        }),
      });

      if (!aiResponse.ok) {
        const errText = await aiResponse.text();
        console.error("Azure AI error:", errText);
        return Response.json({ error: "Failed to generate classes from AI" }, { status: 500 });
      }

      const data = await aiResponse.json();
      const generatedClasses = data.choices?.[0]?.message?.content?.trim() || "";
      
      return Response.json({ classes: generatedClasses.replace(/\n|`/g, "") });
    } catch (err: any) {
      console.error("Error in AI Endpoint:", err);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  },
};
