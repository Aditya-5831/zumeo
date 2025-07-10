"use client";

import { ResumeServerData } from "@/lib/types";
import ResumePreview from "./ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import Link from "next/link";
import { formatDate } from "date-fns";
import MoreMenu from "./MoreMenu";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

interface ResumeItemProps {
  resume: ResumeServerData;
}

const ResumeItem = ({ resume }: ResumeItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  const wasUpdated = resume.createdAt !== resume.updatedAt;

  return (
    <div className="group hover:border-border bg-secondary relative rounded-lg border border-transparent p-3 transition-colors">
      <div className="space-y-3">
        <Link
          href={`/resumes/create?resumeId=${resume.id}`}
          className="space-y-3"
        >
          <div className="inline-block w-full text-center">
            <p className="line-clamp-1 font-semibold">
              {resume.title || "No title"}
            </p>
            {resume.description && (
              <p className="text-muted-foreground line-clamp-2 text-[13px]">
                {resume.description}
              </p>
            )}
            <p className="text-muted-foreground text-xs">
              {wasUpdated ? "Updated" : "Created"} on{" "}
              {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
            </p>
          </div>

          <div className="relative inline-block w-full">
            <ResumePreview
              contentRef={contentRef}
              resumeData={mapToResumeValues(resume)}
              className="overflow-hidden shadow-sm transition-shadow will-change-transform group-hover:shadow-lg"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
          </div>
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
};

export default ResumeItem;
