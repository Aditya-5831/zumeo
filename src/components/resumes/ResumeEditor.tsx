"use client";

import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ResumeEditorFooter from "./ResumeEditorFooter";
import { steps } from "./steps";
import ResumePreviewSection from "./ResumePreviewSection";

const ResumeEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const [resumeData, setResumeData] = useState<ResumeValues>({});

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const FormComponent = steps.find(
    (step) => step.key == currentStep,
  )?.component;

  return (
    <div className="flex w-full flex-col gap-6 p-2 md:p-0">
      <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-0">
        <div className="text-center lg:text-start">
          <h1 className="text-2xl font-medium">Design your resume</h1>
          <p className="text-muted-foreground text-sm">
            Follow the steps below to create your resume. Your progress will be
            saved automatically.
          </p>
        </div>
        <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
      </div>
      <div className="flex flex-col-reverse justify-between gap-2 md:flex-row md:gap-10">
        <div className="w-full space-y-5 lg:w-1/2">
          {FormComponent && (
            <FormComponent
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
          <ResumeEditorFooter
            currentStep={currentStep}
            setCurrentStep={setStep}
          />
        </div>

        <div className="w-full lg:w-2/3">
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
