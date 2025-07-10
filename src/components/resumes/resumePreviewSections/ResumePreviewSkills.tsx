import { ResumeValues } from "@/lib/validation";
import React from "react";
import { BorderStyles } from "../BorderStyleButton";

interface ResumePreviewSkillsProps {
  resumeData: ResumeValues;
}

const ResumePreviewSkills = ({
  resumeData: { skills, colorHex, borderStyle },
}: ResumePreviewSkillsProps) => {
  if (!skills?.length) return null;

  return (
    <div>
      <div
        className="h-1.5 w-full bg-gray-900"
        style={{ backgroundColor: colorHex }}
      />
      <div className="my-6 break-inside-avoid space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: colorHex }}>
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-md bg-black px-3 py-1 text-sm text-white"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewSkills;
