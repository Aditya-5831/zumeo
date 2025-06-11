import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

import { Sparkles, FileText, BrainCog } from "lucide-react";

const FEATURES = [
  {
    title: "AI-Powered Resume Generation",
    description:
      "Generate tailored, job-ready resumes instantly with the help of AI.",
    icon: Sparkles,
  },
  {
    title: "Professional Templates",
    description:
      "Choose from modern, ATS-friendly designs built to impress recruiters.",
    icon: FileText,
  },
  {
    title: "Smart Skill Suggestions",
    description:
      "Get personalized skill and experience recommendations based on your profile.",
    icon: BrainCog,
  },
];

const Features = () => {
  return (
    <div className="my-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center gap-y-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-primary text-lg/10">Features</span>
            <h2 className="text-3xl font-medium text-neutral-800 sm:text-4xl">
              Powerful Features to Build Your Resume Smarter
            </h2>
            <p className="text-sm text-gray-500">
              Everything you need to create a professional, AI-optimized resume
              in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {FEATURES.map(({ description, title, icon: Icon }) => (
              <div
                key={title}
                className="flex h-[220px] max-w-[340px] flex-col gap-5 rounded-xl py-4 pr-9 pl-4 shadow-md ring-1 ring-gray-950/10"
              >
                <div className="border-primary/10 w-fit rounded-lg border p-3">
                  <Icon className="text-primary size-5" />
                </div>
                <span className="text-xl font-medium text-gray-700">
                  {title}
                </span>
                <p className="text-[13px] leading-[1.6] text-gray-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Features;
