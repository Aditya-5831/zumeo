"use client";

import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ResumeEditorFooter from "./ResumeEditorFooter";
import { steps } from "./steps";

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
    <div className="flex flex-col gap-6 p-2 md:p-0">
      <div className="flex items-center justify-between">
        <div className="text-center md:text-start">
          <h1 className="text-2xl font-medium">Design your resume</h1>
          <p className="text-muted-foreground text-sm">
            Follow the steps below to create your resume. Your progress will be
            saved automatically.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between gap-2 md:flex-row md:gap-0">
        {FormComponent && (
          <FormComponent
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}
        <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
      </div>
      <ResumeEditorFooter currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
};

export default ResumeEditor;
