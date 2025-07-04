import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import React from "react";

interface ResumePreviewEducationProps {
  resumeData: ResumeValues;
}

const isEducationNotEmpty = (edu: Record<string, string>) =>
  Object.values(edu).some((val) =>
    typeof val === "string" ? val.trim() !== "" : Boolean(val),
  );

const formatedDate = (start?: string, end?: string) => {
  if (!start) return "";
  const formatedStart = formatDate(start, "MM/yyyy");
  const formatedEnd = end ? formatDate(start, "MM/yyyy") : "Present";
  return `${formatedStart} - ${formatedEnd}`;
};

const ResumePreviewEducation = ({
  resumeData: { education, colorHex },
}: ResumePreviewEducationProps) => {
  const nonEmptyEducations = education?.filter(isEducationNotEmpty);

  if (!nonEmptyEducations?.length) return null;

  return (
    <div>
      <div
        className="h-1.5 w-full bg-gray-900"
        style={{ backgroundColor: colorHex }}
      />
      <div className="my-6 space-y-6">
        <h2 className="text-2xl font-bold" style={{ color: colorHex }}>
          Education
        </h2>
        {nonEmptyEducations.map((edu, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium" style={{ color: colorHex }}>
                {edu.degree}
              </span>
              {edu.startDate && (
                <span
                  style={{ color: colorHex }}
                  className="text-muted-foreground text-sm font-medium"
                >
                  {formatedDate(edu.startDate, edu.endDate)}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-base font-medium">{edu.institute}</span>
              <span className="text-muted-foreground text-sm font-medium">
                {edu.grade}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreviewEducation;
