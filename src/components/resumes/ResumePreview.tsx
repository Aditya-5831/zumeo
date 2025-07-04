import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useRef } from "react";
import ResumePreviewEducation from "./resumePreviewSections/ResumePreviewEducation";
import ResumePreviewHeader from "./resumePreviewSections/ResumePreviewHeader";
import ResumePreviewSkills from "./resumePreviewSections/ResumePreviewSkills";
import ResumePreviewWorkExperience from "./resumePreviewSections/ResumePreviewWorkExperience";

interface ResumePreviewProps {
  resumeData: ResumeValues;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { width } = useDimensions(containerRef);

  return (
    <div
      ref={containerRef}
      className="aspect-[210/297] w-full rounded-lg border bg-white text-black shadow-sm ring-gray-950/10"
    >
      <div
        style={{ zoom: (1 / 794) * width }}
        className={cn("space-y-8 p-8", !width && "invisible")}
      >
        <ResumePreviewHeader resumeData={resumeData} />
        <ResumePreviewWorkExperience resumeData={resumeData} />
        <ResumePreviewEducation resumeData={resumeData} />
        <ResumePreviewSkills resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;
