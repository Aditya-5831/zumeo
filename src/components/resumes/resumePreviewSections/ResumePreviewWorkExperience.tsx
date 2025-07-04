import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";

interface ResumePreviewWorkExperienceProps {
  resumeData: ResumeValues;
}

const isWorkExperienceNotEmpty = (exp: Record<string, string>) =>
  Object.values(exp).some((val) =>
    typeof val === "string" ? val.trim() !== "" : Boolean(val),
  );

const getFormatedDateRanges = (start?: string, end?: string) => {
  if (!start) return "";
  const formatedStart = formatDate(start, "MM/yyyy");
  const formatedEnd = end ? formatDate(end, "MM/yyyy") : "Present";
  return `${formatedStart} - ${formatedEnd}`;
};

const ResumePreviewWorkExperience = ({
  resumeData: { workExperiences, colorHex },
}: ResumePreviewWorkExperienceProps) => {
  const nonEmptyWorkExperience = workExperiences?.filter(
    isWorkExperienceNotEmpty,
  );

  if (!nonEmptyWorkExperience?.length) return null;

  return (
    <div>
      <div
        className="h-[5px] w-full bg-gray-900"
        style={{ backgroundColor: colorHex }}
      />

      <div className="my-6 space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: colorHex }}>
          Work Experience
        </h2>
        {nonEmptyWorkExperience.map((exp, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium" style={{ color: colorHex }}>
                {exp.position}
              </span>
              {exp.startDate && (
                <span
                  style={{ color: colorHex }}
                  className="text-muted-foreground text-sm font-medium"
                >
                  {getFormatedDateRanges(exp.startDate, exp.endDate)}
                </span>
              )}
            </div>
            <span className="text-base font-medium">{exp.company}</span>
            <ul className="list-inside list-disc space-y-1.5 text-sm whitespace-pre-line text-zinc-700">
              {exp.description
                ?.split("\n")
                .map((line) => line.trim())
                .filter((line) => line !== "")
                .map((line, index) => <li key={index}>{line}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreviewWorkExperience;
