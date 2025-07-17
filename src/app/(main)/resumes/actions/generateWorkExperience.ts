"use server";

import { openRouterAi } from "@/lib/openRouterAi";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";

export const generateWorkExperience = async (
  input: GenerateWorkExperienceInput,
): Promise<WorkExperience> => {
  const { description } = generateWorkExperienceSchema.parse(input);

  const prompt = `
    You are a resume builder assistant. Given a user-written description, generate a single work experience entry.
    
    Structure your response **exactly** like this (line-by-line, no extras):
    Job title: <job title>
    Company: <company name>
    Start date: <YYYY-MM-DD> (if mentioned)
    End date: <YYYY-MM-DD> (if mentioned)
   Description:
     Bullet 1
     Bullet 2
     Bullet 3 (optional)
    
    Only include fields you can infer. Do not hallucinate unknown dates or company names.
    Description must always be in bullet format but don't add bullet lines.

    `;

  const aiResponse = await openRouterAi({
    prompt: `${prompt}\n\nUser input: ${description}`,
  });

  const rawDescription = aiResponse.match(/Description:([\s\S]*)/)?.[1] || "";

  const cleanedDescription = rawDescription
    .trim()
    .split("\n")
    .map((line: string) => line.replace(/^\s*[-•]\s*/, ""))
    .join("\n");

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: cleanedDescription,
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  };
};
