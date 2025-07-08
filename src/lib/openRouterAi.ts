import axios from "axios";

interface OpenRouterAiProps {
  prompt: string;
}

export const openRouterAi = async ({ prompt }: OpenRouterAiProps) => {
  const openRouterKey = process.env.OPEN_ROUTER_KEY;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
      },
    },
  );

  const aiResponse = response.data.choices?.[0]?.message?.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  return aiResponse;
};
